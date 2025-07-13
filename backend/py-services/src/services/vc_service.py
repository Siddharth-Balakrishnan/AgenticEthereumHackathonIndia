from datetime import datetime, timedelta
import hashlib

class VcService:
    @staticmethod
    def issue_vc(did: str, role: str, expirationDays: int) -> dict:
        # Mock VC issuance (JSON-LD-like structure)
        expires_at = (datetime.now() + timedelta(days=expirationDays)).isoformat()
        vc = {
            "id": f"vc-{hashlib.sha256(did.encode()).hexdigest()}",
            "type": "VerifiableCredential",
            "issuer": "did:ethr:issuer",
            "credentialSubject": {"did": did, "role": role},
            "expiresAt": expires_at
        }
        # Mock signing (replace with cryptography library later)
        vc["signature"] = hashlib.sha256(str(vc).encode()).hexdigest()
        return vc


# To verify this code locally

if __name__ == "__main__":
    # Provide sample input values
    sample_did = "did:example:123456789abcdefghi"
    sample_role = "admin"
    sample_expiration_days = 30

    # Call the method and print the result
    issued_vc = VcService.issue_vc(sample_did, sample_role, sample_expiration_days)
    
    # Print the Verifiable Credential to verify output
    print("Issued Verifiable Credential:")
    print(issued_vc)

