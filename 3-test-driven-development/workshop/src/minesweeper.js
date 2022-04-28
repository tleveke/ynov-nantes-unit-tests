const createBoard = (rows, columns) => {
    const board = [];
    //Colums
    for (let i = 0; i < columns; i++) {
        board.push([]);
        //Rows
        for (let j = 0; j < rows; j++) {
            //Cell
            board[i].push(".");
        }
    }
    return board;
};
const createBombs = (board, bombs) => {
    for (const bomb of bombs) {
        board[bomb[0]][bomb[1]] = "*";
    }
    return board;
};

module.exports = {
    createBoard,
    createBombs
}; 