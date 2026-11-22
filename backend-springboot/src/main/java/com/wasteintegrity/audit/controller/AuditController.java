package com.wasteintegrity.audit.controller;

import com.wasteintegrity.audit.model.AiAnalysisResult;
import com.wasteintegrity.audit.model.HandoffAudit;
import com.wasteintegrity.audit.service.AuditService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuditController {

    private final AuditService auditService;

    @PostMapping("/audit/analyze")
    public ResponseEntity<AiAnalysisResult> analyzeAuditImage(@RequestBody Map<String, Object> requestPayload) {
        AiAnalysisResult result = auditService.analyzeImageWithAi(requestPayload);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/routes/{routeId}/audits")
    public ResponseEntity<Map<String, Object>> recordAudit(
            @PathVariable String routeId,
            @RequestBody Map<String, Object> auditData) {
        HandoffAudit audit = auditService.recordAudit(routeId, auditData);
        return ResponseEntity.ok(Map.of(
                "message", "Audit successfully recorded to chain of custody",
                "audit", audit
        ));
    }
}
