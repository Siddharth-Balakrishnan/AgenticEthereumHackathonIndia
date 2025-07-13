import hashlib
import json
import os
import sys

# Import the verifier function
from verify_zkp_smart import verify_zkp_from_file


def hash_role(role: str) -> str:
    return hashlib.sha256(role.encode()).hexdigest()

def generate_zkp_from_vc(vc_path: str) -> dict:
    if not os.path.exists(vc_path):
        print("VC file not found at path:", vc_path)
        return {}

    with open(vc_path, 'r') as f:
        vc = json.load(f)

    role = vc.get("credentialSubject", {}).get("role")

    if not role:
        print("'role' missing in VC.")
        return {}

    role_hash = hash_role(role)

    proof = {
        "role_hash": role_hash,
        "proof": f"zkp_proof_mock_{role_hash[:10]}"
    }

    output_path = os.path.join(os.path.dirname(__file__), "zkp_output.json")
    with open(output_path, "w") as f:
        json.dump(proof, f, indent=2)

    print("ZKP successfully written to:", output_path)
    return proof

if __name__ == "__main__":
    vc_file_path = os.path.join(os.path.dirname(__file__), "sample_vc.json")
    print("Reading VC from:", vc_file_path)

    zkp = generate_zkp_from_vc(vc_file_path)

    if zkp:
        print("ZKP content:")
        print(json.dumps(zkp, indent=2))

        # Run ZKP verifier
        print("\nRunning ZKP verifier...")
        result = verify_zkp_from_file()  # result will be 1 or 0
        print("Verification Result:", result)

        # Save 0 or 1 in final_output.json
        final_output_path = os.path.join(os.path.dirname(__file__), "final_output.json")
        with open(final_output_path, "w") as f:
            json.dump({"verification_result": result}, f, indent=2)

        print("Final result saved to:", final_output_path)

    else:
        sys.exit(1)
