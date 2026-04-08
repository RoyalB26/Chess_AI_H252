from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from stockfishBot import StockfishPlayer, chess

PATH= "stockfish-windows-x86-64-sse41-popcnt/stockfish/stockfish-windows-x86-64-sse41-popcnt.exe" 

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # cho phép tất cả (dev)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


users= []

class Board(BaseModel):
    fen: str

@app.get("/")
def read_root(a: int = 0, b: int = 0):
    return {f"Hello from FastAPI: {a} + {b}"}

@app.post("/move")
def make_move(board: Board):
    color= chess.BLACK
    player= StockfishPlayer(color= color, engine_path= PATH)
    move= player.get_move(board.fen)
    chess.Board(board.fen).push(move)
    player.close()
    return {"move": move.uci()}

@app.post("/available_moves")
def get_available_moves(board: Board):
    available_moves = [move.uci() for move in chess.Board(board.fen).legal_moves]
    return {"available_moves": available_moves}
