package com.etherium.secureiam.controller;

import com.etherium.secureiam.service.DidService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/did")
public class DidController {

    private static final Logger logger = LoggerFactory.getLogger(DidController.class);

    @Autowired
    private DidService didService;

    @PostMapping("/generate")
    public ResponseEntity<?> generateDid(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        try {
            String email = request.get("email");
            if (email == null || email.trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Invalid input: email missing/invalid");
                response.put("errorCode", 400);
                return ResponseEntity.badRequest().body(response);
            }
            Map<String, Object> result = didService.generateDid(email);
            response.putAll(result);
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            logger.error("Error in generateDid: ", e);
            response.put("success", false);
            response.put("message", "Internal server error: " + e.getMessage());
            response.put("errorCode", 500);
            return ResponseEntity.status(500).body(response);
        }
    }

    @GetMapping("/fetch")
    public ResponseEntity<?> fetchDIDs() {
        Map<String, Object> response = new HashMap<>();
        try {
            logger.info("Received request to fetch DIDs");
            Map<String, Object> result = didService.fetchDIDs();
            response.putAll(result);
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            logger.error("Error in fetchDIDs: ", e);
            response.put("success", false);
            response.put("message", "Internal server error: " + e.getMessage());
            response.put("errorCode", 500);
            return ResponseEntity.status(500).body(response);
        }
    }
}