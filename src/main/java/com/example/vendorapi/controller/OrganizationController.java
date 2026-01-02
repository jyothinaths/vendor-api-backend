package com.example.vendorapi.controller;

import com.example.vendorapi.entity.Organization;
import com.example.vendorapi.repository.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/organizations")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class OrganizationController {
    private final OrganizationRepository organizationRepository;

    @GetMapping
    public List<Organization> getAll() {
        return organizationRepository.findAll();
    }

    @PostMapping
    public Organization create(@RequestBody Organization org) {
        return organizationRepository.save(org);
    }
}
