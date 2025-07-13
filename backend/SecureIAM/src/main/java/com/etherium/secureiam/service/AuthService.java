package com.etherium.secureiam.service;

import org.springframework.stereotype.Service;

@Service
public class AuthService {

    public boolean authenticate(String walletSignature, String macAddress) {
        // Mock SIWE validation (replace with Web3j in later hours)
        boolean isWalletValid = walletSignature != null && !walletSignature.isEmpty();
        // Mock MAC VC validation (call Python /vc/issue later)
        boolean isMacValid = macAddress != null && macAddress.matches("([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})");
        return isWalletValid && isMacValid;
    }
}