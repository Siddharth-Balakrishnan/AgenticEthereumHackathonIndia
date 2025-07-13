package com.etherium.secureiam.controller;

import com.etherium.secureiam.model.LoginRequest;
import com.etherium.secureiam.model.VcRequest;
import com.etherium.secureiam.service.AuthService;
import com.etherium.secureiam.service.VcService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private VcService vcService;

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Map<String, Object> response = new HashMap<>();
        try {
            if (request == null || request.getWalletSignature() == null || request.getMacAddress() == null) {
                response.put("success", false);
                response.put("message", "Invalid input: wallet signature or MAC address missing");
                response.put("errorCode", 400);
                return ResponseEntity.badRequest().body(response);
            }
            boolean isAuthenticated = authService.authenticate(request.getWalletSignature(), request.getMacAddress());
            if (isAuthenticated) {
                response.put("success", true);
                response.put("token", "mock-jwt");
                response.put("message", "Login successful");
                return ResponseEntity.ok().body(response);
            } else {
                response.put("success", false);
                response.put("message", "Invalid wallet or MAC");
                response.put("errorCode", 401); // Unauthorized
                return ResponseEntity.status(401).body(response);
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Internal server error: " + e.getMessage());
            response.put("errorCode", 500);
            return ResponseEntity.status(500).body(response);
        }
    }

    @PostMapping("/vc/request")
    public ResponseEntity<?> requestVc(@RequestBody VcRequest request) {
        Map<String, Object> response = new HashMap<>();
        try {
            if (request == null || request.getUserId() == null || request.getMacAddress() == null) {
                response.put("success", false);
                response.put("message", "Invalid input: user ID or MAC address missing");
                response.put("errorCode", 400);
                return ResponseEntity.badRequest().body(response);
            }
            String vcId = vcService.requestVc(request.getUserId(), request.getMacAddress());
            response.put("status", "requested");
            response.put("vcId", vcId);
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Internal server error: " + e.getMessage());
            response.put("errorCode", 500);
            return ResponseEntity.status(500).body(response);
        }
    }
}