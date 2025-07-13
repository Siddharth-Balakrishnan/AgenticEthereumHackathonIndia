from fastapi import APIRouter, HTTPException, File, UploadFile
from src.models.vc_request import VcRequest
from src.services.zkp_service import ZkpService
import shutil
import os
import json

router = APIRouter()

@router.post("/zkp/generate")
async def generate_zkp(vc_request: VcRequest):
    """
    Generate a Zero-Knowledge Proof (ZKP) from a VC request.
    Expects DID, role, and expirationDays to generate a VC and derive ZKP.
    """
    try:
        zkp = ZkpService.generate_zkp(vc_request.did, vc_request.role, vc_request.expirationDays)
        return {"zkp": zkp}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/zkp/verify")
async def verify_zkp(file: UploadFile = File(...)):
    """
    Verify a Zero-Knowledge Proof (ZKP) from an uploaded zkp_output.json file.
    Returns verification result (1 for valid, 0 for invalid).
    """
    try:
        # Save uploaded file temporarily
        temp_path = "temp_zkp_output.json"
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Load the JSON data
        with open(temp_path, "r") as f:
            zkp_data = json.load(f)

        result = ZkpService.verify_zkp(zkp_data)
        os.remove(temp_path)  # Clean up temporary file
        return {"verification_result": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))