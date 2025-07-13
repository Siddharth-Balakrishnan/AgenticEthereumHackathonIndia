// src/main/java/com/etherium/secureiam/service/DidService.java
package com.etherium.secureiam.service;

import com.etherium.secureiam.model.Did;
import com.etherium.secureiam.model.User;
import com.etherium.secureiam.model.UserRole;
import com.etherium.secureiam.model.Role;
import com.etherium.secureiam.repository.UserRepository;
import com.etherium.secureiam.repository.DidRepository;
import com.etherium.secureiam.repository.UserRoleRepository;
import com.etherium.secureiam.repository.RoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class DidService {

    private static final Logger logger = LoggerFactory.getLogger(DidService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private DidRepository didRepository;

    @Autowired
    private RestTemplate restTemplate;

    private final String pythonApiUrl = "http://localhost:8000/api/did/create";

    public Map<String, Object> generateDid(String email) {
        Map<String, Object> response = new HashMap<>();
        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

            Did existingDid = didRepository.findByUserId(user.getUserId()).orElse(null);
            if (existingDid != null) {
                response.put("success", true);
                response.put("did", existingDid.getDidValue());
                response.put("message", "Existing DID retrieved");
                return response;
            }

            UserRole userRole = userRoleRepository.findByUser_UserId(user.getUserId())
                    .orElseThrow(() -> new RuntimeException("Role not found for user: " + user.getUserId()));

            String roleName = userRole.getRole().getRoleName();

            Map<String, Object> payload = new HashMap<>();
            payload.put("id", user.getUserId().toString());
            payload.put("type", roleName);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);
            ResponseEntity<Map> responseEntity = restTemplate.postForEntity(pythonApiUrl, entity, Map.class);

            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                String didValue = (String) responseEntity.getBody().get("did");
                Did did = new Did();
                did.setDidId(UUID.randomUUID());
                did.setUserId(user.getUserId());
                did.setDidValue(didValue);
                did.setCreatedAt(new Date()); // Convert to Date
                did.setPlatform(null);
                didRepository.save(did);

                response.put("success", true);
                response.put("did", didValue);
                response.put("message", "DID generated and stored successfully");
            } else {
                response.put("success", false);
                response.put("message", "Failed to generate DID: " + responseEntity.getStatusCode());
                response.put("errorCode", 500);
            }
        } catch (Exception e) {
            logger.error("Error in generateDid: ", e);
            response.put("success", false);
            response.put("message", "Internal server error: " + e.getMessage());
            response.put("errorCode", 500);
        }
        return response;
    }

    public Map<String, Object> fetchDIDs() {
        Map<String, Object> response = new HashMap<>();
        try {
            logger.info("Attempting to fetch all DIDs...");
            List<Did> dids = didRepository.findAll();
            logger.info("Retrieved DIDs: {}", dids);
            if (dids == null) {
                logger.warn("didRepository.findAll() returned null");
                response.put("success", false);
                response.put("message", "Database query returned null");
                response.put("errorCode", 500);
                return response;
            }
            if (dids.isEmpty()) {
                response.put("success", true);
                response.put("data", new HashMap<>());
                response.put("message", "No DIDs found");
            } else {
                Map<String, Object> data = dids.stream()
                        .filter(did -> did.getDidId() != null && did.getDidValue() != null && did.getUserId() != null)
                        .collect(Collectors.toMap(
                                did -> did.getDidId().toString(),
                                did -> {
                                    Map<String, Object> didMap = new HashMap<>();
                                    didMap.put("did", did.getDidValue());
                                    didMap.put("userId", did.getUserId().toString());
                                    didMap.put("createdAt", did.getCreatedAt() != null ? did.getCreatedAt() : "N/A");
                                    didMap.put("platform", did.getPlatform());

                                    userRepository.findById(did.getUserId()).ifPresent(user -> {
                                        didMap.put("email", user.getEmail() != null ? user.getEmail() : "N/A");
                                    });

                                    userRoleRepository.findByUser_UserId(did.getUserId()).ifPresent(userRole -> {
                                        roleRepository.findById(userRole.getRole().getRoleId()).ifPresent(role -> {
                                            didMap.put("role", role.getRoleName() != null ? role.getRoleName() : "N/A");
                                        });
                                    });

                                    return didMap;
                                }
                        ));
                response.put("success", true);
                response.put("data", data);
                response.put("message", "DIDs retrieved successfully");
            }
        } catch (Exception e) {
            logger.error("Error in fetchDIDs: ", e);
            response.put("success", false);
            response.put("message", "Internal server error: " + (e.getMessage() != null ? e.getMessage() : "Unknown error"));
            response.put("errorCode", 500);
        }
        return response;
    }
}