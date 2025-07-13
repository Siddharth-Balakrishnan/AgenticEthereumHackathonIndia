// src/main/java/com/etherium/secureiam/repository/DidRepository.java
package com.etherium.secureiam.repository;

import com.etherium.secureiam.model.Did;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface DidRepository extends JpaRepository<Did, UUID> {
    Optional<Did> findByUserId(UUID userId);
}