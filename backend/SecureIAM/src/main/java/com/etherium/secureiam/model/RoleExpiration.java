package com.etherium.secureiam.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class RoleExpiration {
    @Id
    private String role;
    private int expirationDays;

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public int getExpirationDays() {
        return expirationDays;
    }

    public void setExpirationDays(int expirationDays) {
        this.expirationDays = expirationDays;
    }
}