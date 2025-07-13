import json
import os
import subprocess
import sys
from src.services.vc_service import VcService
import hashlib

class ZkpService:
    @staticmethod
    def generate_zkp(did: str, role: str, expirationDays: int) -> dict:
        """
        Generate a ZKP based on the provided DID, role, and expirationDays.
        Creates a VC dynamically and derives a ZKP without using a predefined file.
        """
        # Generate VC
        vc = VcService.issue_vc(did, role, expirationDays)

        # Hash the role to create role_hash
        role_hash = hashlib.sha256(role.encode()).hexdigest()

        # Create mock proof (mimicking zkp_proof_mock_ prefix)
        proof = f"zkp_proof_mock_{role_hash[:10]}"

        # Construct ZKP
        zkp = {
            "role_hash": role_hash,
            "proof": proof
        }

        return zkp

    @staticmethod
    def verify_zkp(zkp_data: dict) -> int:
        """
        Verify a ZKP by creating a temporary zkp_output.json file from the payload
        and calling verify_zkp_smart.py as a subprocess.
        Returns 1 (valid) or 0 (invalid).
        """
        # Save zkp_data to a temporary file
        temp_path = "temp_zkp_output.json"
        with open(temp_path, "w") as f:
            json.dump(zkp_data, f, indent=2)

        # Run the verify_zkp_smart.py script as a subprocess
        result = subprocess.run(
            [sys.executable, "src/services/zkp-prover/verify_zkp_smart.py"],
            input=temp_path,
            text=True,
            capture_output=True
        )

        # Clean up temporary file
        if os.path.exists(temp_path):
            os.remove(temp_path)

        if result.returncode != 0:
            print(f"Verification script error: {result.stderr}")
            return 0

        # Parse the output to get the result (1 or 0)
        output = result.stdout.strip()
        if "Final Result: Verified" in output:
            return 1
        return 0