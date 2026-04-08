# Introduction
This is a basic chess game, you're white player and stockfish is black player.

# Download stockfish
1. Go to https://stockfishchess.org/download/
2. Install suitable version for your computer
3. Unzip it and then move it into Back_End
4. Edit 'PATH' in Back_End/main.py if there is any problem

# Create environment
```
# Windows
py -m venv venv

# Linux / macOS:
python3 -m venv venv
```

# Activate environment
```
# Windows
venv\Scripts\Activate.ps1

# Linux / macOS:
source venv/bin/activate
```

# Install requirements
```
pip install -r requirements.txt
```

# Start Back_End
```
uvicorn Back_End.main:app --reload
```
# Start Game
1. Open frontend/index.html
2. Right click
3. Open with live server

