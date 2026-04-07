async function next_move(){
    const response = await fetch("http://127.0.0.1:8000/move");
    const value = await response.json();
    console.log("Dữ liệu: ", value) 
    return value;
}

export {next_move}