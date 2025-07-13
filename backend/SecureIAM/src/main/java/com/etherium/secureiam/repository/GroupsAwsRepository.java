package com.etherium.secureiam.repository;

import com.etherium.secureiam.model.GroupsAws;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface GroupsAwsRepository extends JpaRepository<GroupsAws, UUID> {
}