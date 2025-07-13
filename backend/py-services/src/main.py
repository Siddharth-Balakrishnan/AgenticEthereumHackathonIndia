from fastapi import FastAPI
from src.routes import did, vc, zkp

app = FastAPI()

app.include_router(did.router, prefix="/api")
app.include_router(vc.router, prefix="/api")
app.include_router(zkp.router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)