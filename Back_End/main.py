from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # cho phép tất cả (dev)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


users= []

class Move(BaseModel):
    nextMove: str

@app.get("/")
def read_root(a: int = 0, b: int = 0):
    return {f"Hello from FastAPI: {a} + {b}"}

@app.get("/move")
def getNextMove():
    nextMove= input("input next move: ")
    return {"nextMove": nextMove}



