package com.etherium.secureiam.repository;

import com.etherium.secureiam.model.PoliciesAws;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PoliciesAwsRepository extends JpaRepository<PoliciesAws, UUID> {
}