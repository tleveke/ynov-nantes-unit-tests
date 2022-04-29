class Board {
    constructor(rows, columns,bombs = []) {

        if (rows < 0) {
            throw new Error('Negative row is not possible')
        }
        if (columns < 0) {
            throw new Error('Negative column is not possible')
        }

        if (rows === null) {
            throw new Error('Null row is not possible')
        }
        if (columns === null) {
            throw new Error('Null column is not possible')
        }

        this.rows = rows;
        this.columns = columns;
        this.board = [];
        for (let i = 0; i < columns; i++) {
            this.board.push([]);
            for (let j = 0; j < rows; j++) {
                this.board[i].push(new Cell(i, j));
            }
        }
        this.bombs = bombs;
        this.createBombs();
        this.status = 'alive';
    }
    createBombs() {
        this.bombs.forEach((bomb) => {
            this.board[bomb[0]][bomb[1]].isBomb = true;
        });
    }
    getCell(row, column) {
        if (this.board.length > 0) {
            return this.board[row][column];
        }
        else {
            return null;
        }
    }
    click(row, column) {
        let cell = this.getCell(row, column);
        if (cell.isBomb) {
            this.status = 'dead';
        }
        else {
            //transform the cell into a number then transform the cells next to it if it's not a bomb
            cell.isClicked = true;
            
        }
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
    getStatus() {
        return this.status;
    }
    getPoints() {
        let board = [];
        this.board.forEach((row,index) => {
            board.push([]);
            row.forEach((cell) => {
                if (cell.isBomb) {
                    board[index].push('*');
                } else {
                    board[index].push(0);
                }
            });
        });

        this.bombs.forEach((bomb,index) => {
            const bombRow = bomb[0];
            const bombColumn = bomb[1];

            let calCoords = [];
            
            if (bombRow - 1 >= 0) {
                calCoords.push({row : bombRow - 1, column : bombColumn});    
            }
            if (bombRow + 1 < this.rows) {
                calCoords.push({row : bombRow + 1, column : bombColumn});
            }
            if (bombColumn - 1 >= 0) {
                calCoords.push({row : bombRow, column : bombColumn - 1});
            }
            if (bombColumn + 1 < this.columns) {
                calCoords.push({row : bombRow, column : bombColumn + 1});
            }
            if (bombRow - 1 >= 0 && bombColumn - 1 >= 0) {
                calCoords.push({row : bombRow - 1, column : bombColumn - 1});
            }
            if (bombRow - 1 >= 0 && bombColumn + 1 < this.columns) {
                calCoords.push({row : bombRow - 1, column : bombColumn + 1});
            }
            if (bombRow + 1 < this.rows && bombColumn - 1 >= 0) {
                calCoords.push({row : bombRow + 1, column : bombColumn - 1});
            }
            if (bombRow + 1 < this.rows && bombColumn + 1 < this.columns) {
                calCoords.push({row : bombRow + 1, column : bombColumn + 1});
            }

            calCoords.forEach((coord) => {
                if (board[coord.row] && board[coord.row][coord.column] !== '*') {
                    if (board[coord.row][coord.column] === 0) {
                        board[coord.row][coord.column] = 1;
                    } else {
                        board[coord.row][coord.column] += 1;
                    }
                }
            });

        });
        
        this.board = board;
    };
}
class Cell {
    constructor(row, column) {
        this.row = row;
        this.column = column;
        this.isBomb = false;
        this.isClicked = false;
    }
    get() {
        if (this.getStatus()) {
            return '.';
        }
        return '.';
    }
    getStatus() {
        return this.isBomb;
    }
}

module.exports = {
    Board
}; 