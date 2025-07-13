package com.etherium.secureiam.model;

import jakarta.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "dids")
public class Did {
    @Id
    @Column(name = "did_id")
    private UUID didId;

    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "did_value")
    private String didValue;

    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(name = "platform")
    private String platform;

    // Constructors
    public Did() {}

    public Did(UUID didId, UUID userId, String didValue, Date createdAt, String platform) {
        this.didId = didId;
        this.userId = userId;
        this.didValue = didValue;
        this.createdAt = createdAt;
        this.platform = platform;
    }

    // Getters and Setters
    public UUID getDidId() { return didId; }
    public void setDidId(UUID didId) { this.didId = didId; }
    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }
    public String getDidValue() { return didValue; }
    public void setDidValue(String didValue) { this.didValue = didValue; }
    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
    public String getPlatform() { return platform; }
    public void setPlatform(String platform) { this.platform = platform; }
}