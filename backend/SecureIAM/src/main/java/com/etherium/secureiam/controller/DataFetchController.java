// src/main/java/com/etherium/secureiam/controller/DataFetchController.java
package com.etherium.secureiam.controller;

import com.etherium.secureiam.model.User;
import com.etherium.secureiam.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/data")
public class DataFetchController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        Map<String, Object> response = new HashMap<>();
        try {
            List<User> users = adminService.getAllUsers();
            if (users != null && !users.isEmpty()) {
                response.put("success", true);
                response.put("message", "Users fetched successfully");
                response.put("data", users);
                return ResponseEntity.ok().body(response);
            } else {
                response.put("success", false);
                response.put("message", "No users found");
                response.put("errorCode", 404);
                return ResponseEntity.status(404).body(response);
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Internal server error: " + e.getMessage());
            response.put("errorCode", 500);
            return ResponseEntity.status(500).body(response);
        }
    }
}