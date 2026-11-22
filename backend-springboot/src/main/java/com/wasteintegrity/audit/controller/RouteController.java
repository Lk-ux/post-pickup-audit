package com.wasteintegrity.audit.controller;

import com.wasteintegrity.audit.model.WasteRoute;
import com.wasteintegrity.audit.service.AuditService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class RouteController {

    private final AuditService auditService;

    @GetMapping
    public ResponseEntity<List<WasteRoute>> getAllRoutes() {
        return ResponseEntity.ok(auditService.getAllRoutes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<WasteRoute> getRouteById(@PathVariable String id) {
        return auditService.getRouteById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
