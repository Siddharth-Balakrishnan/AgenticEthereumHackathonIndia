from pydantic import BaseModel

class VcRequest(BaseModel):
    did: str
    role: str
    expirationDays: int