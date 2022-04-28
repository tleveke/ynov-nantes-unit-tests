const { createBoard, createBombs } = require("../src/minesweeper");

const inputInitData = [
    {
        rows: 4,
        columns: 3,
        bombs: [
            [0, 0],
            [0, 1],
            [2, 2],
        ]
    },
    {
        rows: 3,
        columns: 4,
        bombs:[
            [0,3],
            [1,1]
        ]

    },
    {
        rows: 2,
        columns: 2,
        bombs:[
            [1,1],
            [0,1]
        ]
    },
    {
        rows: 1,
        columns: 1,
        bombs:[
            [0,0]
        ]
    },
];

describe("MineSweeper", function () {

    describe.each(inputInitData)("Create minesweeper board", (data) => {
        test(`MineSweeper Board should have ${data.rows} rows and ${data.columns} columns`, () => {
            const board = createBoard(data.rows, data.columns);
            //The board should have length equal to the number of columns
            expect(board.length).toBe(data.columns);
            board.forEach((row) => {
                //Each row should have length equal to the number of rows
                expect(row.length).toBe(data.rows);
                for (const cell of row) {
                    //Each cell should be a string
                    expect(cell).not.toBe(null);
                }
            });
        });
    });

    describe.each(inputInitData)("Create minesweeper board with bombs", (data) => {
        test(`MineSweeper Board should have ${data.bombs.length} bombs`, () => {
            const board = createBoard(data.rows, data.columns);
            const boardBombs = createBombs(board, data.bombs);
            //The board should have bombs equal to the number of bombs
            expect(boardBombs.reduce((acc, row) => {
                return acc + row.reduce((acc, cell) => {
                    return cell === "*" ? acc + 1 : acc;
                }, 0);
            }, 0)).toBe(data.bombs.length);

            data.bombs.forEach((bomb) => {
                //In each bomb, the cell should be a bomb on the board with coordinates [bomb[0], bomb[1]]
                expect(boardBombs[bomb[0]][bomb[1]]).toBe("*");
            });
        });
    });
});