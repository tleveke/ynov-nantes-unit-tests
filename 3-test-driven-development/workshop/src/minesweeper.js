class Board {
    constructor(rows, columns,bombs = []) {
        this.rows = rows;
        this.columns = columns;
        this.board = [];
        for (let i = 0; i < columns; i++) {
            this.board.push([]);
            for (let j = 0; j < rows; j++) {
                this.board[i].push(new Cell(i, j));
            }
        }
        this.createBombs(bombs);
    }
    createBombs(bombs) {
        bombs.forEach((bomb) => {
            this.board[bomb[0]][bomb[1]].isBomb = true;
        });
    }
    getCell(row, column) {
        return this.board[column][row];
    }
    getStringBoard() {
        let board = '';
        this.board.forEach((row) => {
            row.forEach((cell) => {
                board += cell.get();
            });
            board += '\n';
        });
        return board;
    }
}
class Cell {
    constructor(row, column) {
        this.row = row;
        this.column = column;
        this.isBomb = false;
    }
    get() {
        if (this.isBomb) {
            return '*';
        }
        return '.';
    }
}

module.exports = {
    Board
}; 