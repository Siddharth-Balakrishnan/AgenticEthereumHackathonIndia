package com.etherium.secureiam.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_roles")
public class UserRole {
    @Id
    @Column(name = "user_role_id")
    private String userRoleId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", referencedColumnName = "role_id")
    private Role role;

    @Column(name = "created_at")
    private String createdAt;

    @Column(name = "platform")
    private String platform;

    public UserRole() {
    }

    public UserRole(String userRoleId, User user, Role role, String createdAt, String platform) {
        this.userRoleId = userRoleId;
        this.user = user;
        this.role = role;
        this.createdAt = createdAt;
        this.platform = platform;
    }

    public String getUserRoleId() { return userRoleId; }
    public void setUserRoleId(String userRoleId) { this.userRoleId = userRoleId; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
    public String getPlatform() { return platform; }
    public void setPlatform(String platform) { this.platform = platform; }
}