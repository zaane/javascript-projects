const gameboard = (function () {
    // const state = [
    //     [' ', ' ', ' '],
    //     [' ', ' ', ' '],
    //     [' ', ' ', ' ']
    // ];

    const state = [
        ['X', 'X', 'O'],
        [' ', ' ', 'X'],
        ['O', ' ', 'X']
    ];

    const updateState = (mark, i, j) => { /* TODO: change to player.mark*/
        if (state[i][j] === ' ') {
            state[i][j] = mark
        };
    };

    function printBoard() {
        const boardString =`${state[0][0]} | ${state[0][1]} | ${state[0][2]}
${state[1][0]} | ${state[1][1]} | ${state[1][2]}
${state[2][0]} | ${state[2][1]} | ${state[2][2]}
`;
        console.log(boardString);
    };

    return { updateState, printBoard };
})();

const calculator = (function () {
    const add = (a, b) => a + b;
    const sub = (a, b) => a - b;
    const mul = (a, b) => a * b;
    const div = (a, b) => a / b;
    return { add, sub, mul, div };
})();

