import json
import sys
from web3 import Web3


def verify_zkp_from_file(zkp_file="zkp_output.json", abi_file="verify_abi.json", contract_address="0x850EDC5B5e02f203aAE5402D5b0E3232DaeC624F"):
    # Connect to Ganache
    w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))
    if not w3.is_connected():
        print("Web3 not connected. Make sure Ganache is running.")
        return 0

    w3.eth.default_account = w3.eth.accounts[0]

    # Load ABI
    try:
        with open(abi_file) as f:
            abi = json.load(f)
    except FileNotFoundError:
        print("ABI file not found.")
        return 0

    # Load ZKP output
    try:
        with open(zkp_file) as f:
            proof_data = json.load(f)
    except FileNotFoundError:
        print("zkp_output.json not found.")
        return 0

    role_hash_hex = proof_data.get("role_hash")
    proof_str = proof_data.get("proof")

    if not role_hash_hex:
        print("'role_hash' not found in zkp_output.json.")
        return 0
    if not proof_str:
        print("'proof' not found in zkp_output.json.")
        return 0

    # Input validation
    if not isinstance(proof_str, str) or len(proof_str) < 15:
        print("Proof is either not a string or too short to be valid.")
        return 0

    try:
        role_hash_bytes = Web3.to_bytes(hexstr=role_hash_hex)
    except ValueError:
        print("Invalid hex format in 'role_hash'.")
        return 0

    # Proof constraint (mock logic)
    expected_prefix = "zkp_proof_mock_" + role_hash_hex[:10]
    if not proof_str.startswith(expected_prefix):
        print(f"Proof mismatch: expected prefix '{expected_prefix}', got '{proof_str[:30]}...'")
        return 0

    # Load contract
    contract = w3.eth.contract(address=contract_address, abi=abi)

    print("Verifying ZKP on Smart Contract...")
    try:
        is_valid = contract.functions.verify(role_hash_bytes).call()
        if is_valid:
            print("ZKP Verified via Smart Contract.")
            return 1
        else:
            print("ZKP Rejected by Smart Contract.")
            return 0
    except Exception as e:
        print(f"Contract call failed: {e}")
        return 0


# Dummy main to test locally
if __name__ == "__main__":
    result = verify_zkp_from_file()
    print("\nFinal Result:", "Verified" if result == 1 else "Not Verified")
