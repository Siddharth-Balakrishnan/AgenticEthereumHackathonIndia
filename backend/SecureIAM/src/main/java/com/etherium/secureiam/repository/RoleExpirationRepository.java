package com.etherium.secureiam.repository;

import com.etherium.secureiam.model.RoleExpiration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleExpirationRepository extends JpaRepository<RoleExpiration, String> {
}