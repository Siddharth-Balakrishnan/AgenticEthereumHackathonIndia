# zkp_request.py

class ZkpRequest:
    def __init__(self, did: str, role: str):
        self.did = did
        self.role = role

    def __repr__(self):
        return f"ZkpRequest(did='{self.did}', role='{self.role}')"
