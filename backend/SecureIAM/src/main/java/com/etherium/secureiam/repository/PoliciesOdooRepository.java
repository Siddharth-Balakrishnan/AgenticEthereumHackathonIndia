package com.etherium.secureiam.repository;

import com.etherium.secureiam.model.PoliciesOdoo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PoliciesOdooRepository extends JpaRepository<PoliciesOdoo, UUID> {
}