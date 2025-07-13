package com.etherium.secureiam.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "policies_odoo")
public class PoliciesOdoo {
    @Id
    @Column(name = "policy_id")
    private java.util.UUID policyId;

    @Column(name = "policy_name")
    private String policyName;

    @Column(name = "description")
    private String description;

    @Column(name = "permissions")
    private String permissions; // Use String for JSONB; consider a custom type if needed

    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    public PoliciesOdoo() {
    }

    public PoliciesOdoo(java.util.UUID policyId, String policyName, String description, String permissions, Date createdAt, Date updatedAt) {
        this.policyId = policyId;
        this.policyName = policyName;
        this.description = description;
        this.permissions = permissions;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public java.util.UUID getPolicyId() { return policyId; }
    public void setPolicyId(java.util.UUID policyId) { this.policyId = policyId; }
    public String getPolicyName() { return policyName; }
    public void setPolicyName(String policyName) { this.policyName = policyName; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getPermissions() { return permissions; }
    public void setPermissions(String permissions) { this.permissions = permissions; }
    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
    public Date getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Date updatedAt) { this.updatedAt = updatedAt; }
}