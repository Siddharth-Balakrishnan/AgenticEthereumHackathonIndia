package com.etherium.secureiam.repository;

import com.etherium.secureiam.model.PoliciesAzure;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PoliciesAzureRepository extends JpaRepository<PoliciesAzure, UUID> {
}