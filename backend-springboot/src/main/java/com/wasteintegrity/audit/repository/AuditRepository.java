package com.wasteintegrity.audit.repository;

import com.wasteintegrity.audit.model.HandoffAudit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuditRepository extends JpaRepository<HandoffAudit, String> {
    List<HandoffAudit> findByStageCode(String stageCode);
    List<HandoffAudit> findByStatus(String status);
}
