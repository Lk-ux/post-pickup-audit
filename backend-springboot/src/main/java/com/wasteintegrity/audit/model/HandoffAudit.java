package com.wasteintegrity.audit.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "handoff_audits")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HandoffAudit {

    @Id
    private String id; // e.g. AUD-A1

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "route_id")
    @JsonIgnore
    private WasteRoute route;

    private String stage; // Collection Vehicle, Transfer Station, Processing Plant Gate
    private String stageCode; // COLLECTION, TRANSFER, PLANT_GATE
    private String timestamp;
    private String location;
    private String stream; // wet, dry, hazardous

    private Integer score; // 0 - 100
    private String status; // VERIFIED, NEEDS_ATTENTION, FLAGGED
    private Double contaminationPercentage;

    @Column(length = 2000)
    private String foreignMaterialsJson; // JSON array of detected foreign contaminants

    @Column(length = 2000)
    private String detectedMaterialsJson;

    @Column(length = 1000)
    private String operatorNotes;

    @Column(length = 1000)
    private String imageUrl;

    @PrePersist
    public void prePersist() {
        if (this.timestamp == null) {
            this.timestamp = Instant.now().toString();
        }
    }
}
