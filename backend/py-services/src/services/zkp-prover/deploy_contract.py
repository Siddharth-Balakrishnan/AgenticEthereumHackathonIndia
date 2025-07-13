from web3 import Web3
from solcx import compile_source, install_solc
import json

# 1. Install Solidity compiler
install_solc("0.8.0")

# 2. Connect to local Ganache
w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))
assert w3.is_connected(), "❌ Ganache not connected"
w3.eth.default_account = w3.eth.accounts[0]  # use first Ganache account

# 3. Solidity code
contract_code = '''
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RoleZKPVerifier {
    bytes32 public expectedHash = 0x8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918;

    function verify(bytes32 roleHash) public view returns (bool) {
        return roleHash == expectedHash;
    }
}
'''

# 4. Compile the contract
compiled_sol = compile_source(contract_code, solc_version="0.8.0")
contract_id, contract_interface = compiled_sol.popitem()

# 5. Extract ABI and Bytecode
abi = contract_interface["abi"]
bytecode = contract_interface["bin"]

# 6. Save ABI to verify_abi.json for later use
with open("verify_abi.json", "w") as f:
    json.dump(abi, f, indent=2)

# 7. Deploy contract
RoleZKPVerifier = w3.eth.contract(abi=abi, bytecode=bytecode)
tx_hash = RoleZKPVerifier.constructor().transact()
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

# 8. Get deployed address
contract_address = tx_receipt.contractAddress
print(f"✅ Contract deployed at: {contract_address}")

# 9. Optional: Save address to a file for reuse
with open("deployed_address.txt", "w") as f:
    f.write(contract_address)
