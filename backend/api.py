from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI()

# Разрешим доступ с любого домена (можно ограничить при необходимости)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

LOG_FILE = os.path.join(os.path.dirname(__file__), "logs", "mint_log.json")

@app.get("/")
def read_root():
    return {"status": "SWS Analytics API running"}

@app.get("/logs")
def get_logs():
    try:
        with open(LOG_FILE, "r") as f:
            data = json.load(f)
        return {"logs": data}
    except Exception as e:
        return {"error": str(e)}

def format_amount(value):
    return float(value) / 1e18 if isinstance(value, int) else value
