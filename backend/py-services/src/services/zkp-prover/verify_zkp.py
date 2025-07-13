import json
import hashlib
def verify_zkp(proof_file="zkp_output.json", expected_role="admin") -> bool:
    with open(proof_file) as f:
        proof = json.load(f)
    expected_hash = hashlib.sha256(expected_role.encode()).hexdigest()
    return proof["role_hash"] == expected_hash

if __name__ == "__main__":
    result = verify_zkp()
    print("ZKP Verified " if result else "ZKP Failed ")
