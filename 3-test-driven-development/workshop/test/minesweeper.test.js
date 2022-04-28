const { Board } = require("../src/minesweeper");

const inputInitData = [
    {
        rows: 4,
        columns: 4,
        bombs: [
            [0, 0],
            [0, 1],
            [2, 2],
        ],
        boardString: `**..
....
..*.
....
`,
        expectedBoardPoint: [
            [ '*', '*', 1, 0 ],
            [ 1, 1, 1, 0 ],
            [ 0, 1, '*', 1 ],
            [ 0, 0, 1, 0 ]
        ],
    },
    {
        rows: 5,
        columns: 5,
        bombs: [
            [2, 1],
            [3, 3],
        ],
        boardString : `.....
.....
.*...
...*.
.....
`,
        expectedBoardPoint:[
            [ 0, 0, 0, 0, 0 ],
            [ 0, 1, 0, 0, 0 ],
            [ 1, '*', 1, 1, 0 ],
            [ 0, 1, 1, '*', 1 ],
            [ 0, 0, 0, 1, 0 ]
        ]
    },
    {
        rows: 2,
        columns: 2,
        bombs: [
            [1, 1],
            [0, 0]
        ],
        boardString: `*.
.*
`,
        expectedBoardPoint: [ [ '*', 2 ], [ 2, '*' ] ]
    },
    {
        rows: 2,
        columns: 2,
        bombs: [
            [0, 0]
        ],
        boardString: `*.
..
`,
        expectedBoardPoint : [ [ '*', 1 ], [ 1, 0 ] ]
    },
];

describe("MineSweeper", function () {
    //Test constructor of Board
    describe("Board", function () {
        test("should be initialized with rows, columns, bombs", function () {
            const board = new Board(4, 4, [
                [0, 0],
                [0, 1],
                [2, 2],
            ]);
            expect(board.rows).toBe(4);
            expect(board.columns).toBe(4);
            expect(board.bombs).toEqual([
                [0, 0],
                [0, 1],
                [2, 2],
            ]);
        });
        test("should throw error if rows, columns, bombs are not number", function () {
            try {
                const board = new Board("4", "4");
            }
            catch (error) {
                expect(error.message).toBe("board construction failed");
            }
        });
    });

    describe.each(inputInitData)("Create minesweeper board", (data) => {
        test(`MineSweeper Board should have ${data.rows} rows and ${data.columns} columns`, () => {
            const minesweeper = new Board(data.rows, data.columns, []);
            //The board should have length equal to the number of columns
            expect(minesweeper.board.length).toBe(data.columns);
            minesweeper.board.forEach((row) => {
                //Each row should have length equal to the number of rows
                expect(row.length).toBe(data.rows);
                for (const cell of row) {
                    //Each cell should be a string
                    expect(cell).not.toBe(null);
                }
            });
            //test minesweeper.getCell
            expect(minesweeper.getCell(0, 0)).toBe(minesweeper.board[0][0]);
        });
    });

    describe.each(inputInitData)("Create minesweeper board with bombs", (data) => {
        test(`MineSweeper Board should have ${data.bombs.length} bombs`, () => {
            const minesweeper = new Board(data.rows, data.columns, data.bombs);
            //The board should have bombs equal to the number of bombs
            expect(minesweeper.board.reduce((acc, row) => {
                return acc + row.reduce((acc, cell) => {
                    return cell.get() === "*" ? acc + 1 : acc;
                }, 0);
            }, 0)).toBe(data.bombs.length);
            expect(minesweeper.bombs).toEqual(data.bombs);
            expect(minesweeper.getStringBoard()).toBe(data.boardString);
            data.bombs.forEach((bomb) => {
                //In each bomb, the cell should be a bomb on the board with coordinates [bomb[0], bomb[1]]
                expect(minesweeper.board[bomb[0]][bomb[1]].get()).toBe("*");
            });
        });
    });

    // If a bomb is next to a normal cell then the cell has +1
    describe.each(inputInitData)("Create minesweeper board with bombs and cell numbers", (data) => {
        test(`MineSweeper Board should bomb on his coordinates`, () => {
            const minesweeper = new Board(data.rows, data.columns, data.bombs);
            const minesweeperSpoiler = minesweeper.getPoints();

            data.bombs.forEach((bomb) => {
                //In each bomb, the cell should be a bomb on the board with coordinates [bomb[0], bomb[1]]
                expect(minesweeperSpoiler[bomb[0]][bomb[1]]).toBe("*");
            });
        });
        // If a bomb is next to a normal cell then the cell has +1
        test(`MineSweeper Board cell should have numbers in it`, () => {
            const minesweeper = new Board(data.rows, data.columns, data.bombs);
            const minesweeperSpoiler = minesweeper.getPoints();
            expect(minesweeperSpoiler).toMatchObject(data.expectedBoardPoint);
        });
        
    });
});