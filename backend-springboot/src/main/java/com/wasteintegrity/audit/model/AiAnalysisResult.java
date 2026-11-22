package com.wasteintegrity.audit.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AiAnalysisResult {
    private String expectedStream;
    private List<String> detectedMaterials;
    private List<String> foreignMaterials;
    private Boolean foreignMaterialDetected;
    private Double contaminationEstimate;
    private Double confidence;
    private String status;
    private Integer auditScore;
    private String annotatedImage;
    private List<BoundingBox> boundingBoxes;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BoundingBox {
        private String label;
        private String className;
        private Double confidence;
        private Boolean isForeign;
        private List<Double> box;
    }
}
