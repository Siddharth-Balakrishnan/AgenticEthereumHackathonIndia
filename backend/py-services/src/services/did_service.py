
from pydid import DID
import hashlib

class DidService:
    @staticmethod
    def create_did(identifier: str, type_: str) -> str:
        """
        Creates a mock Ethereum DID using a SHA-256 hash of the identifier and type.
        Returns a standards-compliant DID string using the pydid library.
        """
        # Hash the input to create a unique identifier
        hashed_id = hashlib.sha256(f"{identifier}:{type_}".encode()).hexdigest()

        # Create a DID using the 'ethr' method and the hashed ID
        did = DID(f"did:ethr:{hashed_id}")

        return str(did)

# Example usage
#if __name__ == "__main__":
#    service = DidService()
#    example_did = service.create_did("usehgfhgr123", "verifiableCredential")
#    print("Generated DID:", example_did)
