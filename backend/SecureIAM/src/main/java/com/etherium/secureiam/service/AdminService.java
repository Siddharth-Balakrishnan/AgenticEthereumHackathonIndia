package com.etherium.secureiam.service;

import com.etherium.secureiam.model.Did;
import com.etherium.secureiam.model.Role;
import com.etherium.secureiam.model.User;
import com.etherium.secureiam.model.UserRole;
import com.etherium.secureiam.model.Vc;
import com.etherium.secureiam.repository.DidRepository;
import com.etherium.secureiam.repository.RoleRepository;
import com.etherium.secureiam.repository.UserRepository;
import com.etherium.secureiam.repository.UserRoleRepository;
import com.etherium.secureiam.repository.VcRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private VcRepository vcRepository;

    @Autowired
    private DidRepository didRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private RestTemplate restTemplate;

    public boolean createUser(String name, String email, String roleName) {
        try {
            if (userRepository.findByEmail(email).isPresent()) {
                return false;
            }

            UUID roleId = switch (roleName.toLowerCase()) {
                case "admin" -> UUID.fromString("1a154435-05a4-47bf-9b6b-e5d9ad8e64dd");
                case "guest" -> UUID.fromString("ed64f92b-8cbf-4d3b-b602-983db18ae0d2");
                case "editor" -> UUID.fromString("78b9bce0-20b7-4f99-9320-14dbdce1f50a");
                case "manager" -> UUID.fromString("1e3b45c4-dd1c-426e-bd04-b03fa58bc8af");
                default -> null;
            };

            if (roleId == null) {
                return false;
            }

            Optional<Role> roleOptional = roleRepository.findById(roleId);
            if (roleOptional.isEmpty()) {
                return false;
            }

            User user = new User();
            user.setUserId(UUID.randomUUID());
            user.setEmail(email);
            user.setName(name);
            user.setStatus("active");
            user.setPasswordHash(passwordEncoder.encode("defaultPassword"));
            user.setCreatedAt(new Date());
            user.setUpdatedAt(new Date());

            user = userRepository.save(user);

            UserRole userRole = new UserRole();
            userRole.setUserRoleId(UUID.randomUUID().toString());
            userRole.setUser(user);
            userRole.setRole(roleOptional.get());
            userRole.setCreatedAt(new Date().toString());
            userRole.setPlatform("web");

            userRoleRepository.save(userRole);

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public boolean setExpiration(String role, int expirationDays) {
        return true; // Placeholder implementation
    }

    public Map<String, Object> generateAndStoreVc(String email, int expirationDays) {
        Map<String, Object> response = new HashMap<>();
        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
            UUID userId = user.getUserId();

            Did did = didRepository.findByUserId(userId).orElse(null);
            if (did == null) {
                Map<String, Object> didResponse = generateDidForUser(user);
                if (!Boolean.TRUE.equals(didResponse.get("success"))) {
                    response.put("success", false);
                    response.put("message", didResponse.get("message"));
                    response.put("errorCode", 500);
                    return response;
                }
                did = didRepository.findByUserId(userId).orElse(null);
                if (did == null) {
                    response.put("success", false);
                    response.put("message", "Failed to generate DID");
                    response.put("errorCode", 500);
                    return response;
                }
            }
            String didValue = did.getDidValue();

            UserRole userRole = userRoleRepository.findByUser_UserId(userId)
                    .orElseThrow(() -> new RuntimeException("Role not found for user: " + userId));
            String role = userRole.getRole().getRoleName();

            Calendar calendar = Calendar.getInstance();
            calendar.add(Calendar.DAY_OF_YEAR, expirationDays);
            Date expiresAt = calendar.getTime();
            Date createdAt = new Date();

            Vc vc = new Vc();
            vc.setVcId(UUID.randomUUID().toString().replaceAll("-", ""));
            vc.setUserId(userId);
            vc.setDid(didValue);
            vc.setRole(role);
            vc.setExpiresAt(expiresAt);
            vc.setSignature(UUID.randomUUID().toString().replaceAll("-", ""));
            vc.setCreatedAt(createdAt);
            vcRepository.save(vc);

            sendVcEmail(userId.toString(), didValue, vc.getVcId(), email);

            response.put("success", true);
            response.put("vcId", vc.getVcId());
            response.put("message", "VC generated and stored successfully");
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Internal server error: " + e.getMessage());
            response.put("errorCode", 500);
        }
        return response;
    }

    private Map<String, Object> generateDidForUser(User user) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("email", user.getEmail());
        payload.put("id", user.getUserId().toString());
        String didUrl = "http://localhost:8000/api/did/create";
        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(didUrl, payload, Map.class);
            return response.getBody();
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Failed to generate DID: " + e.getMessage());
            return errorResponse;
        }
    }

    public Map<String, Object> fetchVcByUserId(String userIdStr) {
        Map<String, Object> response = new HashMap<>();
        try {
            UUID userId = UUID.fromString(userIdStr);
            Vc vc = vcRepository.findByUserId(userId);
            if (vc != null) {
                response.put("success", true);
                response.put("data", vc);
            } else {
                response.put("success", false);
                response.put("message", "No VC found for user ID: " + userIdStr);
                response.put("errorCode", 404);
            }
        } catch (IllegalArgumentException e) {
            response.put("success", false);
            response.put("message", "Invalid user ID format: " + userIdStr);
            response.put("errorCode", 400);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Internal server error: " + e.getMessage());
            response.put("errorCode", 500);
        }
        return response;
    }

    public void sendVcEmail(String userId, String did, String vcId, String email) {
        try {
            UUID uuid = UUID.fromString(userId);
            Optional<User> userOptional = userRepository.findById(uuid);
            if (userOptional.isEmpty()) return;

            Vc vc = vcRepository.findByUserId(uuid);
            if (vc == null) return;

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Your Verifiable Credential is Ready");
            message.setText(String.format(
                    "Dear %s,\n\nYour Verifiable Credential (VC) and DID have been created.\n" +
                            "VC ID: %s\nDID: %s\nExpires At: %s\n\nBest regards,\nSecureIAM Team",
                    userOptional.get().getName(), vcId, did, new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss").format(vc.getExpiresAt())
            ));
            message.setFrom("siddharthpersonal001@gmail.com");
            mailSender.send(message);
        } catch (IllegalArgumentException e) {
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}