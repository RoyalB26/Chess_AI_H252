
let API_url = "https://chess-api-production-c6c5.up.railway.app"

function fen(board) {
    // board là mảng 2 chiều 8x8, ví dụ: [['r','n',...], [...]]
    return board.map(row => {
        let fenRow = "";
        let empty = 0;
        row.forEach(cell => {
            if (cell === null || cell === "") {
                empty++;
            } else {
                if (empty > 0) { fenRow += empty; empty = 0; }
                fenRow += cell; // 'p', 'R', 'k'...
            }
        });
        if (empty > 0) fenRow += empty;
        return fenRow;
    }).join("/") + " w KQkq - 0 1"; // Thêm các thông số mặc định của lượt đi
}

async function next_move(board) {
    board= fen(board);
    const response = await fetch(`${API_url}/move`, {
        method: "POST", // Phải là POST nếu gửi body
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'fen': board // Thuộc tính này tên là "board"
            })
    });
    const value = await response.json();
    console.log("Dữ liệu: ", value);
    return value;
}

async function get_legal_moves(board) {
    board= fen(board);
    const response = await fetch(`${API_url}/available_moves`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'fen': board
        })
    });
    const value = await response.json();
    console.log("Available moves: ", value);
    return value;
}


export {next_move, get_legal_moves}