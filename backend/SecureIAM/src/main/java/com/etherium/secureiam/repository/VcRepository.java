package com.etherium.secureiam.repository;

import com.etherium.secureiam.model.Vc;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface VcRepository extends JpaRepository<Vc, String> {
    Vc findByUserId(UUID userId);
}