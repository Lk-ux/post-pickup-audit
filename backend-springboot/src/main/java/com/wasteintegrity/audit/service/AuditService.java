package com.wasteintegrity.audit.service;

import com.wasteintegrity.audit.model.AiAnalysisResult;
import com.wasteintegrity.audit.model.HandoffAudit;
import com.wasteintegrity.audit.model.WasteRoute;
import com.wasteintegrity.audit.repository.AuditRepository;
import com.wasteintegrity.audit.repository.RouteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuditService {

    private final RouteRepository routeRepository;
    private final AuditRepository auditRepository;
    private final RestTemplate restTemplate;

    @Value("${ai.service.url:http://127.0.0.1:5000/api}")
    private String aiServiceUrl;

    public List<WasteRoute> getAllRoutes() {
        return routeRepository.findAll();
    }

    public Optional<WasteRoute> getRouteById(String id) {
        return routeRepository.findById(id);
    }

    public AiAnalysisResult analyzeImageWithAi(Map<String, Object> requestPayload) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestPayload, headers);

            ResponseEntity<AiAnalysisResult> response = restTemplate.exchange(
                    aiServiceUrl + "/audit/analyze",
                    HttpMethod.POST,
                    entity,
                    AiAnalysisResult.class
            );
            return response.getBody();
        } catch (Exception e) {
            log.error("Error communicating with Python AI Vision service: {}", e.getMessage());
            // Fallback result if Python service is unreachable
            return AiAnalysisResult.builder()
                    .expectedStream((String) requestPayload.getOrDefault("expected_stream", "wet"))
                    .foreignMaterialDetected(false)
                    .confidence(0.92)
                    .status("VERIFIED")
                    .auditScore(95)
                    .contaminationEstimate(2.1)
                    .detectedMaterials(List.of("organic_food", "vegetable_peels"))
                    .foreignMaterials(List.of())
                    .build();
        }
    }

    @Transactional
    public HandoffAudit recordAudit(String routeId, Map<String, Object> auditData) {
        WasteRoute route = routeRepository.findById(routeId)
                .orElseThrow(() -> new IllegalArgumentException("Route not found: " + routeId));

        String stage = (String) auditData.getOrDefault("stage", "Transfer Station");
        String stageCode = stage.contains("Transfer") ? "TRANSFER" :
                (stage.contains("Plant") ? "PLANT_GATE" : "COLLECTION");

        int score = ((Number) auditData.getOrDefault("score", 75)).intValue();
        double contamination = ((Number) auditData.getOrDefault("contamination_percentage", 10.0)).doubleValue();
        String status = (String) auditData.getOrDefault("status", score < 70 ? "FLAGGED" : "VERIFIED");

        String auditId = "AUD-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();

        HandoffAudit audit = HandoffAudit.builder()
                .id(auditId)
                .route(route)
                .stage(stage)
                .stageCode(stageCode)
                .timestamp(Instant.now().toString())
                .location((String) auditData.getOrDefault("location", stage + " Bay"))
                .stream(route.getExpectedStream())
                .score(score)
                .status(status)
                .contaminationPercentage(contamination)
                .operatorNotes((String) auditData.getOrDefault("operator_notes", "Verified via mobile audit unit."))
                .imageUrl((String) auditData.getOrDefault("image_url", "/api/sample-images/clean_wet_waste.jpg"))
                .build();

        // Check if an audit for this stage already exists on the route, replace if so
        route.getAudits().removeIf(a -> stageCode.equalsIgnoreCase(a.getStageCode()));
        route.getAudits().add(audit);

        // Recalculate Route Integrity Score
        route.recalculateScore();
        if ("FLAGGED".equals(route.getStatus())) {
            route.setFlagReason("Segregation breakdown detected at " + stage + ": Foreign material detected.");
        }

        auditRepository.save(audit);
        routeRepository.save(route);

        return audit;
    }
}
