from fastapi import APIRouter, HTTPException
from src.models.did_request import DidRequest
from src.services.did_service import DidService

router = APIRouter()

@router.post("/did/create")
async def create_did(request: DidRequest):
    try:
        did = DidService.create_did(request.id, request.type)
        return {"did": did}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))