import { chess } from "./modules/chess.js"; // Note: .js extension often required in native ESM
import { next_move } from "./modules/api_request.js";
const chessboardElement = document.getElementById('chessboard');
const statusElement = document.getElementById('status');

let game;
// Check if elements exist before initializing
if (chessboardElement && statusElement) {
    game = chess(chessboardElement, statusElement);
    game.initGame();
}

async function gameLoop() {
    while (true) {
        if (game.getCurrentPlayer() === 'black') {
            const data = await next_move(game.getCurrentBoard());
            game.update(data.move);
        }
        await new Promise(r => setTimeout(r, 300));
    }
}

if (game) {
    gameLoop();
}