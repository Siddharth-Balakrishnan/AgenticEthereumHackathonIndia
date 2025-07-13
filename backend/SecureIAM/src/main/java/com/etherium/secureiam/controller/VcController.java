package com.etherium.secureiam.controller;

import com.etherium.secureiam.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/vc")
@CrossOrigin(origins = "http://localhost:5173") // Allow CORS for frontend at port 5173
public class VcController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createVc(@RequestBody Map<String, Object> payload) {
        String email = (String) payload.get("email");
        Integer expirationDays;

        Object expDaysObj = payload.get("expirationDays");
        if (expDaysObj instanceof String) {
            try {
                expirationDays = Integer.parseInt((String) expDaysObj);
            } catch (NumberFormatException e) {
                Map<String, Object> response = new java.util.HashMap<>();
                response.put("success", false);
                response.put("message", "Invalid expirationDays format: must be a valid integer");
                response.put("errorCode", 400);
                return ResponseEntity.badRequest().body(response);
            }
        } else if (expDaysObj instanceof Integer) {
            expirationDays = (Integer) expDaysObj;
        } else {
            Map<String, Object> response = new java.util.HashMap<>();
            response.put("success", false);
            response.put("message", "Email and expirationDays are required");
            response.put("errorCode", 400);
            return ResponseEntity.badRequest().body(response);
        }

        if (email == null || expirationDays == null) {
            Map<String, Object> response = new java.util.HashMap<>();
            response.put("success", false);
            response.put("message", "Email and expirationDays are required");
            response.put("errorCode", 400);
            return ResponseEntity.badRequest().body(response);
        }

        Map<String, Object> result = adminService.generateAndStoreVc(email, expirationDays);
        if (Boolean.TRUE.equals(result.get("success"))) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(500).body(result);
        }
    }

    @GetMapping("/fetch/{userId}")
    public ResponseEntity<Map<String, Object>> fetchVc(@PathVariable String userId) {
        Map<String, Object> result = adminService.fetchVcByUserId(userId);
        if (Boolean.TRUE.equals(result.get("success"))) {
            return ResponseEntity.ok(result);
        } else {
            int errorCode = (int) result.getOrDefault("errorCode", 500);
            return ResponseEntity.status(errorCode).body(result);
        }
    }
}