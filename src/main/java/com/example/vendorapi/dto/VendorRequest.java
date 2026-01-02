package com.example.vendorapi.dto;

import com.example.vendorapi.entity.VendorStatus;
import lombok.Data;

@Data
public class VendorRequest {
    private String name;
    private String email;
    private VendorStatus status;
}
