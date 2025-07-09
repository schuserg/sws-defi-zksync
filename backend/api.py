from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI()

# Разрешаем доступ с любого домена
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

LOG_FILE = os.path.join(os.path.dirname(__file__), "logs", "mint_log.json")

@app.get("/logs")
def get_logs():
    try:
        with open(LOG_FILE, "r") as f:
            data = json.load(f)
        return {"logs": data}
    except Exception as e:
        return {"error": str(e)}

