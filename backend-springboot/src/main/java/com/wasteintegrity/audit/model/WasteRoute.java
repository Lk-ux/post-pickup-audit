package com.wasteintegrity.audit.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "waste_routes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WasteRoute {

    @Id
    private String id; // e.g. ROUTE-A, ROUTE-B

    private String name;
    private String zone;
    private String vehicle;
    private String vehicleType;
    private String driver;
    private String expectedStream; // wet, dry, hazardous

    private String status; // HIGH_INTEGRITY, NEEDS_ATTENTION, FLAGGED
    private Double routeScore;
    private String flagReason;

    @OneToMany(mappedBy = "route", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Builder.Default
    private List<HandoffAudit> audits = new ArrayList<>();

    public void recalculateScore() {
        if (audits == null || audits.isEmpty()) {
            this.routeScore = 100.0;
            this.status = "HIGH_INTEGRITY";
            return;
        }
        double sum = 0.0;
        boolean hasFlagged = false;
        for (HandoffAudit audit : audits) {
            sum += audit.getScore();
            if ("FLAGGED".equalsIgnoreCase(audit.getStatus())) {
                hasFlagged = true;
            }
        }
        this.routeScore = Math.round((sum / audits.size()) * 10.0) / 10.0;
        if (this.routeScore < 70.0 || hasFlagged) {
            this.status = "FLAGGED";
        } else if (this.routeScore < 90.0) {
            this.status = "NEEDS_ATTENTION";
        } else {
            this.status = "HIGH_INTEGRITY";
        }
    }
}
