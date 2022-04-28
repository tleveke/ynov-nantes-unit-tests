const { createBoard } = require("../src/minesweeper");

const inputInitData = [
    {
        rows: 4,
        columns: 3,
    },
    {
        rows: 3,
        columns: 4,
    },
    {
        rows: 2,
        columns: 2,
    },
    {
        rows: 1,
        columns: 1,
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

});