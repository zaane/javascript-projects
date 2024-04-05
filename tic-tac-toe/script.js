const gameboard = (function () {
    const state = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];

    // const state = [
    //     ['X', 'X', 'O'],
    //     [' ', ' ', 'X'],
    //     ['O', ' ', 'X']
    // ];

    const updateState = (player, i, j) => { /* TODO: change to player.mark*/
        if (state[i][j] === ' ') {
            state[i][j] = player.mark;
        };
        return state;
    };

    function printBoard() {
        const boardString =`${state[0][0]} | ${state[0][1]} | ${state[0][2]}
${state[1][0]} | ${state[1][1]} | ${state[1][2]}
${state[2][0]} | ${state[2][1]} | ${state[2][2]}
`;
        console.log(boardString);
    };

    return { state, updateState, printBoard };
})();


function createPlayer (name, mark) {
    this.name = name;
    this.mark = mark;
    // const markColor = '#FFF';

    let wins = 0;

    const getScore = () => wins;
    const addWin = () => wins++;

    return { name, mark, getScore, addWin };
};


player1 = createPlayer('Guy', 'X');
player2 = createPlayer('Gal', 'O');