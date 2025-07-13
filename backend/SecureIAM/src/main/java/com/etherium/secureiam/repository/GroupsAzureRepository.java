package com.etherium.secureiam.repository;

import com.etherium.secureiam.model.GroupsAzure;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface GroupsAzureRepository extends JpaRepository<GroupsAzure, UUID> {
}