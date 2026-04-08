// chess.js
function chess(chessboard, statusDisplay) {
    let board = [];
    let currentPlayer = 'white';
    let selectedSquare = null;

    const piecesMap = {
        'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
        'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
    };

    const initialBoard = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ];

    function initGame() {
        board = JSON.parse(JSON.stringify(initialBoard));
        currentPlayer = 'white';
        selectedSquare = null;
        renderBoard();
        updateStatus();
    }

    function renderBoard() {
        chessboard.innerHTML = '';
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                const isLight = (row + col) % 2 === 0;
                square.className = `square ${isLight ? 'light' : 'dark'}`;
                
                const piece = board[row][col];
                if (piece) {
                    square.textContent = piecesMap[piece];
                    square.classList.add(piece === piece.toUpperCase() ? 'white-piece' : 'black-piece');
                }

                if (selectedSquare && selectedSquare.row === row && selectedSquare.col === col) {
                    square.classList.add('selected');
                }

                square.onclick = () => handleSquareClick(row, col);
                chessboard.append(square);
            }
        }
    }

    function updateStatus() {
        statusDisplay.textContent = `Lượt đi: Quân ${currentPlayer === 'white' ? 'Trắng' : 'Đen'}`;
    }

    function getPieceColor(piece) {
        if (!piece) return null;
        return piece === piece.toUpperCase() ? 'white' : 'black';
    }
    function handleSquareClick(row, col) {
        const pieceAtClickedSquare = board[row][col];

        if (selectedSquare) {
            const fromRow = selectedSquare.row;
            const fromCol = selectedSquare.col;
            const pieceToMove = board[fromRow][fromCol];

            // 1. Click same square -> Deselect
            if (fromRow === row && fromCol === col) {
                selectedSquare = null;
                renderBoard();
                return;
            }

            // 2. Click same color -> Switch selection
            if (pieceAtClickedSquare && getPieceColor(pieceAtClickedSquare) === currentPlayer) {
                selectedSquare = { row, col };
                renderBoard();
                return;
            }

            // 3. Move Piece (Currently no move validation, just logic)
            board[row][col] = pieceToMove;
            board[fromRow][fromCol] = '';
            selectedSquare = null;
            currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
            updateStatus();
            renderBoard();
        } else {
            // Select a piece
            if (pieceAtClickedSquare && getPieceColor(pieceAtClickedSquare) === currentPlayer) {
                selectedSquare = { row, col };
                renderBoard();
            }
        }
    }

    function convertMove(str_move) {
        let fromCol = str_move.charCodeAt(0) - 'a'.charCodeAt(0);
        let fromRow = 8 - parseInt(str_move[1]);
        let toCol = str_move.charCodeAt(2) - 'a'.charCodeAt(0);
        let toRow = 8 - parseInt(str_move[3]);
        return { fromRow, fromCol, toRow, toCol };
    }

    function update(next_move){
        let {fromRow, fromCol, toRow, toCol} = convertMove(next_move)
        handleSquareClick(fromRow, fromCol)
        handleSquareClick(toRow, toCol)
    }

    function getCurrentBoard() {
        return board;
    }

    function getCurrentPlayer() {  
        return currentPlayer;
    }

    return { initGame, update, getCurrentBoard, getCurrentPlayer };
}

export { chess };