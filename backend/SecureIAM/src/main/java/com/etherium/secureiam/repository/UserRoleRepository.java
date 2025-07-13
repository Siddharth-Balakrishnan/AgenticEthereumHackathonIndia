package com.etherium.secureiam.repository;

import com.etherium.secureiam.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRoleRepository extends JpaRepository<UserRole, String> {
    Optional<UserRole> findByUser_UserId(UUID userId);
}