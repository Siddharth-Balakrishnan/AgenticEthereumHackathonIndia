package com.etherium.secureiam.model;

import jakarta.persistence.*;

@Entity
@Table(name = "groups_aws")
public class GroupsAws {
    @Id
    @Column(name = "group_id")
    private java.util.UUID groupId;

    @Column(name = "group_name")
    private String groupName;

    @Column(name = "description")
    private String description;

    @Column(name = "created_at")
    private java.util.Date createdAt;

    @Column(name = "updated_at")
    private java.util.Date updatedAt;

    public GroupsAws() {
    }

    public GroupsAws(java.util.UUID groupId, String groupName, String description, java.util.Date createdAt, java.util.Date updatedAt) {
        this.groupId = groupId;
        this.groupName = groupName;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public java.util.UUID getGroupId() { return groupId; }
    public void setGroupId(java.util.UUID groupId) { this.groupId = groupId; }
    public String getGroupName() { return groupName; }
    public void setGroupName(String groupName) { this.groupName = groupName; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public java.util.Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(java.util.Date createdAt) { this.createdAt = createdAt; }
    public java.util.Date getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(java.util.Date updatedAt) { this.updatedAt = updatedAt; }
}