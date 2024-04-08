const gameboard = (function () {
    let state = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];

    const getState = () => state;

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

    function checkForWinner() { 
        for (let i = 0; i < 3; i++) {
            if (state[i][0] !== ' '
                && state[i][0] === state[i][1]
                && state[i][0] === state[i][2]) {

                return {type:'row', index: i, mark:state[i][0]} ;
            }; // check rows for tic-tac-toe
        };

        for (let i = 0; i < 3; i++) {
            if (state[0][i] !== ' '
                && state[0][i] === state[1][i]
                && state[0][i] === state[2][i]) {

                return {type:'column', index: i, mark: state[0][i] };
            }; // check columns for tic-tac-toe
        };

        if (state[0][0] !== ' '
            && state[0][0] === state[1][1]
            && state[0][0] === state[2][2]) {
            return {type:'diagonal', index: 0, mark: state[0][0] };
        }; //check main diagonal for tic-tac-toe

        if (state[0][2] !== ' '
            && state[0][2] === state[1][1]
            && state[0][2] === state[2][0]) {
            return {type: 'diagonal', index: 2, mark: state[0][2] };
        }; //check back diagonal for tic-tac-toe 

        return false;
    };

    function reset() { 
        state = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];
    };

    return { getState, update, print, reset, checkForWinner };
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
    let currentPlayer = player1;

    const playTurn = (i, j) => {
        gameboard.update(currentPlayer, i, j);
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    return { playTurn };
})();


const displayController = (function () {
    const gameCels = document.querySelectorAll('.game-cel');

    const updateScreen = () => {
        let state = gameboard.getState();

        gameCels[0].textContent = state[0][0];
        gameCels[1].textContent = state[0][1];
        gameCels[2].textContent = state[0][2];
        gameCels[3].textContent = state[1][0];
        gameCels[4].textContent = state[1][1];
        gameCels[5].textContent = state[1][2];
        gameCels[6].textContent = state[2][0];
        gameCels[7].textContent = state[2][1];
        gameCels[8].textContent = state[2][2];
    };

    function clickHandler(e) {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;
        game.playTurn(selectedRow, selectedColumn);
        updateScreen();
    };
    
    gameCels.forEach((item) => {
        item.addEventListener('click', clickHandler);
    });


    // const drawLine = () => {
    //     if 
    // }

    return { updateScreen }
})();


resetButton = document.querySelector('button.reset');
resetButton.addEventListener('click', () => {
    gameboard.reset();
    displayController.updateScreen();
});


const startCell = document.querySelector('.game-cel[data-row="0"][data-column="0"]');
startCell.addEventListener('click', () => console.log('first row second column clicked'))

