package com.etherium.secureiam.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @Column(name = "role_id")
    private java.util.UUID roleId;

    @Column(name = "role_name")
    private String roleName;

    @Column(name = "description")
    private String description;

    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @Column(name = "platform")
    private String platform;

    public Role() {
    }

    public Role(java.util.UUID roleId, String roleName, String description, Date createdAt, Date updatedAt, String platform) {
        this.roleId = roleId;
        this.roleName = roleName;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.platform = platform;
    }

    public java.util.UUID getRoleId() { return roleId; }
    public void setRoleId(java.util.UUID roleId) { this.roleId = roleId; }
    public String getRoleName() { return roleName; }
    public void setRoleName(String roleName) { this.roleName = roleName; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
    public Date getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Date updatedAt) { this.updatedAt = updatedAt; }
    public String getPlatform() { return platform; }
    public void setPlatform(String platform) { this.platform = platform; }
}