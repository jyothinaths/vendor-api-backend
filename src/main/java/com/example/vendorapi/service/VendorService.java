package com.example.vendorapi.service;

import com.example.vendorapi.dto.VendorRequest;
import com.example.vendorapi.dto.VendorResponse;
import com.example.vendorapi.entity.Vendor;
import com.example.vendorapi.repository.VendorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VendorService {
    private final VendorRepository vendorRepository;
    
    @Transactional
    public VendorResponse createVendor(VendorRequest request) {
        Vendor vendor = new Vendor();
        vendor.setName(request.getName());
        vendor.setEmail(request.getEmail());
        vendor.setStatus(request.getStatus());
        
        Vendor savedVendor = vendorRepository.save(vendor);
        return mapToResponse(savedVendor);
    }
    
    public List<VendorResponse> getAllVendors() {
        return vendorRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    public VendorResponse getVendorById(Long id) {
        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found with id: " + id));
        return mapToResponse(vendor);
    }
    
    @Transactional
    public VendorResponse updateVendor(Long id, VendorRequest request) {
        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found with id: " + id));
        
        vendor.setName(request.getName());
        vendor.setEmail(request.getEmail());
        vendor.setStatus(request.getStatus());
        
        Vendor updatedVendor = vendorRepository.save(vendor);
        return mapToResponse(updatedVendor);
    }
    
    @Transactional
    public void deleteVendor(Long id) {
        if (!vendorRepository.existsById(id)) {
            throw new RuntimeException("Vendor not found with id: " + id);
        }
        vendorRepository.deleteById(id);
    }
    
    private VendorResponse mapToResponse(Vendor vendor) {
        return new VendorResponse(
                vendor.getId(),
                vendor.getName(),
                vendor.getEmail(),
                vendor.getStatus(),
                vendor.getCreatedAt()
        );
    }
}
