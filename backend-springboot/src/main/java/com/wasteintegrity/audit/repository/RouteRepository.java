package com.wasteintegrity.audit.repository;

import com.wasteintegrity.audit.model.WasteRoute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RouteRepository extends JpaRepository<WasteRoute, String> {
    List<WasteRoute> findByStatus(String status);
}
