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

    const update = (player, i, j) => {
        if (state[i][j] === ' ') {
            state[i][j] = player.mark;
            return true;
        } else {
            return false;
        };
    };

    function print() {
        const boardString = `${state[0][0]} | ${state[0][1]} | ${state[0][2]}
${state[1][0]} | ${state[1][1]} | ${state[1][2]}
${state[2][0]} | ${state[2][1]} | ${state[2][2]}
`;
        console.log(boardString);
    };

    function checkForWinner() { //returns winner mark if win, else false. in future, maybe return also the specific row/column/diagonal so we can mark it visually
        for (let i = 0; i < 3; i++) {
            if (state[i][0] !== ' '
                && state[i][0] === state[i][1]
                && state[i][0] === state[i][2]) {

                return state[i][0];
            }; // check rows for tic-tac-toe
        };

        for (let i = 0; i < 3; i++) {
            if (state[0][i] !== ' '
                && state[0][i] === state[1][i]
                && state[0][i] === state[2][i]) {

                return state[0][i];
            }; // check columns for tic-tac-toe
        };

        if (state[0][0] !== ' '
            && state[0][0] === state[1][1]
            && state[0][0] === state[2][2]) {
                return state[0][0];
            }; //check main diagonal for tic-tac-toe
        
            if (state[0][2] !== ' '
            && state[0][2] === state[1][1]
            && state[0][2] === state[2][0]) {
                return state[0][2];
            }; //check back diagonal for tic-tac-toe 
            
        return false;
    };

    return { state, update, print, checkForWinner };
})();


function createPlayer(name, mark) {
    this.name = name;
    this.mark = mark;
    // const markColor = '#FFF';

    let wins = 0;

    const getScore = () => wins;
    const addWin = () => wins++;

    return { name, mark, getScore, addWin };
};


player1 = createPlayer('Guy', 'X');  //TODO: let players select their own names
player2 = createPlayer('Gal', 'O');

const game = (function () {
    // let roundCount = 0;
    let currentPlayer = player1;

    const playTurn = () => {
        let rowIndex = prompt(`${currentPlayer.name}: select row (0, 1, or 2)`);
        let columnIndex = prompt(`${currentPlayer.name}: select column (0, 1, or 2)`);
        gameboard.update(currentPlayer, rowIndex, columnIndex);
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    return { playTurn };
})();


const displayController = (function () {
    const gameCels = document.querySelectorAll('.game-cel');
    gameCels.forEach((item) => {
        item.addEventListener('click', () => {
            console.log(item.id);
        });
    });


    const updateCels = (state) => {
        gameCels[0].textContent = state[0][0];
        gameCels[1].textContent = state[0][1];
        gameCels[2].textContent = state[0][2];
        gameCels[3].textContent = state[1][0];
        gameCels[4].textContent = state[1][1];
        gameCels[5].textContent = state[1][2];
        gameCels[6].textContent = state[2][0];
        gameCels[7].textContent = state[2][1];
        gameCels[8].textContent = state[2][2];
    }
    
    return { updateCels }
})();

// let winner = false;
// while (winner === false) {
//     gameboard.print();
//     game.playTurn();
//     winner = gameboard.checkForWinner();
// };

// gameboard.print();
// console.log(`${winner} wins`);


