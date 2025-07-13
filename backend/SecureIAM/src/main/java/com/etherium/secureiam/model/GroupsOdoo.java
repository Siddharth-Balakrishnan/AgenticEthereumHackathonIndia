package com.etherium.secureiam.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "groups_odoo")
public class GroupsOdoo {
    @Id
    @Column(name = "group_id")
    private java.util.UUID groupId;

    @Column(name = "group_name")
    private String groupName;

    @Column(name = "description")
    private String description;

    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    public GroupsOdoo() {
    }

    public GroupsOdoo(java.util.UUID groupId, String groupName, String description, Date createdAt, Date updatedAt) {
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
    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
    public Date getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Date updatedAt) { this.updatedAt = updatedAt; }
}