package com.etherium.secureiam.repository;

import com.etherium.secureiam.model.GroupsOdoo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface GroupsOdooRepository extends JpaRepository<GroupsOdoo, UUID> {
}