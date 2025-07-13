package com.etherium.secureiam.controller;

import com.etherium.secureiam.model.ExpirationConfig;
import com.etherium.secureiam.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/expiration")
    public ResponseEntity<?> setExpiration(@RequestBody ExpirationConfig config) {
        Map<String, Object> response = new HashMap<>();
        try {
            if (config == null || config.getRole() == null || config.getExpirationDays() < 0) {
                response.put("success", false);
                response.put("message", "Invalid input: role or expiration days missing/invalid");
                response.put("errorCode", 400);
                return ResponseEntity.badRequest().body(response);
            }
            boolean success = adminService.setExpiration(config.getRole(), config.getExpirationDays());
            if (success) {
                response.put("success", true);
                response.put("message", "Expiration set for role " + config.getRole());
                return ResponseEntity.ok().body(response);
            } else {
                response.put("success", false);
                response.put("message", "Invalid role or expiration");
                response.put("errorCode", 400);
                return ResponseEntity.badRequest().body(response);
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Internal server error: " + e.getMessage());
            response.put("errorCode", 500);
            return ResponseEntity.status(500).body(response);
        }
    }

    @PostMapping("/create-user")
    public ResponseEntity<?> createUser(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        try {
            String name = request.get("name");
            String email = request.get("email");
            String roleName = request.get("role");
            if (name == null || email == null || roleName == null || name.trim().isEmpty() || email.trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Invalid input: name, email, or role missing/invalid");
                response.put("errorCode", 400);
                return ResponseEntity.badRequest().body(response);
            }

            boolean success = adminService.createUser(name, email, roleName);
            if (success) {
                String roleId = switch (roleName.toLowerCase()) {
                    case "admin" -> "1a154435-05a4-47bf-9b6b-e5d9ad8e64dd";
                    case "guest" -> "ed64f92b-8cbf-4d3b-b602-983db18ae0d2";
                    case "editor" -> "78b9bce0-20b7-4f99-9320-14dbdce1f50a";
                    case "manager" -> "1e3b45c4-dd1c-426e-bd04-b03fa58bc8af";
                    default -> null;
                };
                response.put("success", true);
                response.put("message", "User created successfully");
                if (roleId != null) {
                    response.put("roleId", roleId); // Include role ID in response
                }
                return ResponseEntity.ok().body(response);
            } else {
                response.put("success", false);
                response.put("message", "Failed to create user");
                response.put("errorCode", 400);
                return ResponseEntity.badRequest().body(response);
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Internal server error: " + e.getMessage());
            response.put("errorCode", 500);
            return ResponseEntity.status(500).body(response);
        }
    }
}