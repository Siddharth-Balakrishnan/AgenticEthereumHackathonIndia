package com.etherium.secureiam.model;

public class LoginRequest {
    private String walletSignature;
    private String macAddress;

    public String getWalletSignature() {
        return walletSignature;
    }

    public void setWalletSignature(String walletSignature) {
        this.walletSignature = walletSignature;
    }

    public String getMacAddress() {
        return macAddress;
    }

    public void setMacAddress(String macAddress) {
        this.macAddress = macAddress;
    }
}