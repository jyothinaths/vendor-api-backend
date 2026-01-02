package com.example.vendorapi.repository;

import com.example.vendorapi.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByOrganizationId(Long organizationId);
}
