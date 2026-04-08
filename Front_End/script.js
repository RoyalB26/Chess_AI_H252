import { chess } from "./modules/chess.js"; // Note: .js extension often required in native ESM
import { next_move, get_legal_moves } from "./modules/api_request.js";
const chessboardElement = document.getElementById('chessboard');
const statusElement = document.getElementById('status');

let game;
// Check if elements exist before initializing
if (chessboardElement && statusElement) {
    game = chess(chessboardElement, statusElement);
    game.initGame();
}

async function gameLoop() {
    let available_moves = [];
    let take_legal_moves = true; // Cờ để bật/tắt việc lấy nước đi hợp lệ từ backend
    while (true) {
        if (game.getCurrentPlayer() === 'black') {
            const data = await next_move(game.getCurrentBoard());
            game.update(data.move);
            take_legal_moves = true; // Sau mỗi nước đi của AI, bật lại việc lấy nước đi hợp lệ cho người chơi
        }
        else if (take_legal_moves) {
            // Lấy nước đi hợp lệ từ backend
            available_moves = await get_legal_moves(game.getCurrentBoard());
            game.set_legal_moves(available_moves.available_moves);
            take_legal_moves = false; // Chỉ lấy một lần sau mỗi lượt đi của người chơi

        }
        await new Promise(r => setTimeout(r, 300));
    }
}

if (game) {
    gameLoop();
}