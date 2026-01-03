package com.example.vendorapi.controller;

import com.example.vendorapi.dto.VendorRequest;
import com.example.vendorapi.dto.VendorResponse;
import com.example.vendorapi.service.VendorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendors")
@RequiredArgsConstructor
public class VendorController {

    private final VendorService vendorService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public VendorResponse createVendor(@RequestBody VendorRequest request) {
        return vendorService.createVendor(request);
    }

    @PreAuthorize("hasAnyRole('ADMIN','ORG')")
    @GetMapping
    public List<VendorResponse> getAllVendors() {
        return vendorService.getAllVendors();
    }

    @PreAuthorize("hasAnyRole('ADMIN','ORG')")
    @GetMapping("/{id}")
    public VendorResponse getVendorById(@PathVariable Long id) {
        return vendorService.getVendorById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public VendorResponse updateVendor(
            @PathVariable Long id,
            @RequestBody VendorRequest request
    ) {
        return vendorService.updateVendor(id, request);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteVendor(@PathVariable Long id) {
        vendorService.deleteVendor(id);
    }
}
