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

module.exports = {
    createBoard,
}; 