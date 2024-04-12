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

                return { type: 'horizontal', index: i, mark: state[i][0] };
            }; // check rows for tic-tac-toe
        };

        for (let i = 0; i < 3; i++) {
            if (state[0][i] !== ' '
                && state[0][i] === state[1][i]
                && state[0][i] === state[2][i]) {

                return { type: 'vertical', index: i, mark: state[0][i] };
            }; // check columns for tic-tac-toe
        };

        if (state[0][0] !== ' '
            && state[0][0] === state[1][1]
            && state[0][0] === state[2][2]) {
            return { type: 'diagonal0', index: 0, mark: state[0][0] };
        }; //check main diagonal for tic-tac-toe

        if (state[0][2] !== ' '
            && state[0][2] === state[1][1]
            && state[0][2] === state[2][0]) {
            return { type: 'diagonal2', index: 2, mark: state[0][2] };
        }; //check back diagonal for tic-tac-toe 

        return false;
    };

    function isEmpty(i, j) {
        return state[i][j] === ' ' ? true : false;
    };

    function reset() {
        state = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];
    };

    return { getState, update, print, reset, checkForWinner, isEmpty };
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
        if (gameboard.isEmpty(i, j)) {
            gameboard.update(currentPlayer, i, j);
            currentPlayer = currentPlayer === player1 ? player2 : player1;
        } else {
            displayController.shakeScreen();
        }
    };

    return { playTurn };
})();


const displayController = (function () {
    const gameArea = document.querySelector('.game-area');
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

        if (gameboard.checkForWinner()) {
            drawWinLine();
            removeListeners();
        }

    };

    function addListeners() {
        gameCels.forEach((item) => {
            item.addEventListener('click', clickHandler);
        });
    };

    function removeListeners() {
        gameCels.forEach((item) => {
            item.removeEventListener('click', clickHandler);
        });
    };

    const shakeScreen = () => {
        gameArea.classList.toggle('shake');
        setTimeout(() => { gameArea.classList.toggle('shake') }, 200);
    }


    const lineCanvas = document.querySelector('.line-canvas');

    const drawWinLine = () => {
        const win = gameboard.checkForWinner();

        const winLine = document.createElement('div');
        winLine.classList.add(win.type, "line");


        let offset;
        switch (win.index) {
            case 0:
                offset = 80;
                break;
            case 1:
                offset = 250;
                break;
            case 2:
                offset = 420;
                break;
            default:
                console.log('win index invalid');
        };

        switch (win.type) {
            case 'horizontal':
                winLine.style.transform =
                    `translateY(${offset}px) translateX(40px)`;
                break;
            case 'vertical':
                winLine.style.transform =
                    `translateY(40px) translateX(${offset}px) rotate(90deg)`;
                break;
            case 'diagonal0':
                winLine.style.transform =
                    `translate(28px, 28px) rotate(45deg)`;
                break;
            case 'diagonal2':
                winLine.style.transform =
                    `translate(28px, 472px) rotate(-45deg)`;
                break;
            default:
                console.log('win type invalid');
        };

        lineCanvas.appendChild(winLine);
        setTimeout(() => { winLine.classList.add('showing') }, 100);
    };

    const clearLineCanvas = () => {
        while (lineCanvas.firstChild)
            lineCanvas.removeChild(lineCanvas.firstChild);
    }

    updateScreen();

    return { updateScreen, shakeScreen, drawWinLine, clearLineCanvas, addListeners }
})();


resetButton = document.querySelector('button.reset');
resetButton.addEventListener('click', () => {
    gameboard.reset();
    displayController.addListeners();
    displayController.clearLineCanvas();
    displayController.updateScreen();
});

const popUpController = (function () {
    const nameDialog = document.querySelector("#name-dialog");
    const submitButton = document.querySelector("#submit-button");
    const form = document.querySelector("form");

    form.addEventListener('submit', (e) => {
        new FormData(form);
    });

    form.addEventListener("formdata", (e) => {
        const data = e.formData;
        const player1Name = 
            data.get("player_1") === "" 
            ? "Player 1"
            : data.get("player_1");
         
        const player2Name = 
            data.get("player_2") === ""
            ? "Player 2"
            : data.get("player_2");

        console.log({player1Name, player2Name});

    })
    

    function showNameInput() {
        nameDialog.showModal();
    }

    return {showNameInput}
})();

displayController.addListeners();
// popUpController.showNameInput();