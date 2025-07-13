from pydantic import BaseModel

class DidRequest(BaseModel):
    id: str
    type: str