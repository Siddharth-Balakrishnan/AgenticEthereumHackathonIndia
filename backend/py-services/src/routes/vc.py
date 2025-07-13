from fastapi import APIRouter, HTTPException
from src.models.vc_request import VcRequest
from src.services.vc_service import VcService

router = APIRouter()

@router.post("/vc/issue")
async def issue_vc(request: VcRequest):
    try:
        vc = VcService.issue_vc(request.did, request.role, request.expirationDays)
        return {"vc": vc, "expiresAt": vc["expiresAt"]}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))