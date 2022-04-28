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
        this.bombs = bombs;
        this.createBombs();
    }
    createBombs() {
        this.bombs.forEach((bomb) => {
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

        this.bombs.forEach((bomb) => {
              
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

            calCoords.forEach((coord) => {
                if (board[coord.row][coord.column] !== '*') {
                    if (board[coord.row][coord.column] === 0) {
                        board[coord.row][coord.column] = 1;
                    } else {
                        board[coord.row][coord.column] += 1;
                    }
                }
            });

        });
        
        return board;
    };
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