package com.etherium.secureiam.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.ResourceAccessException;
import java.util.HashMap;
import java.util.Map;

@Service
public class VcService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String pythonApiUrl = "http://localhost:8000/api"; // Corrected to include /api

    public String requestVc(String userId, String macAddress) {
        try {
            String url = pythonApiUrl + "/vc/issue";
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> payload = new HashMap<>();
            payload.put("did", userId);
            payload.put("role", "guest");
            payload.put("expirationDays", 30);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);
            String response = restTemplate.postForObject(url, entity, String.class);
            return response != null ? "vc-" + System.currentTimeMillis() : "error";
        } catch (HttpClientErrorException e) {
            System.err.println("HTTP error from Python service: " + e.getMessage());
            return "error-http-" + e.getStatusCode().value();
        } catch (ResourceAccessException e) {
            System.err.println("Failed to connect to Python service: " + e.getMessage());
            return "error-service-unavailable";
        }
    }
}