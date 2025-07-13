package com.etherium.secureiam.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "vcs")
public class Vc {
    @Id
    @Column(name = "vc_id")
    private String vcId;

    @Column(name = "user_id")
    private java.util.UUID userId;

    @Column(name = "did")
    private String did;

    @Column(name = "role")
    private String role;

    @Column(name = "expires_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date expiresAt;

    @Column(name = "signature")
    private String signature;

    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    public Vc() {
    }

    public Vc(String vcId, java.util.UUID userId, String did, String role, Date expiresAt, String signature, Date createdAt) {
        this.vcId = vcId;
        this.userId = userId;
        this.did = did;
        this.role = role;
        this.expiresAt = expiresAt;
        this.signature = signature;
        this.createdAt = createdAt;
    }

    public String getVcId() { return vcId; }
    public void setVcId(String vcId) { this.vcId = vcId; }
    public java.util.UUID getUserId() { return userId; }
    public void setUserId(java.util.UUID userId) { this.userId = userId; }
    public String getDid() { return did; }
    public void setDid(String did) { this.did = did; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public Date getExpiresAt() { return expiresAt; }
    public void setExpiresAt(Date expiresAt) { this.expiresAt = expiresAt; }
    public String getSignature() { return signature; }
    public void setSignature(String signature) { this.signature = signature; }
    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
}