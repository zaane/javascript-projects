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

const player1 = createPlayer("Player 1", 'X')
const player2 = createPlayer("Player 2", 'O')

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

    const winHandler = () => {
        displayController.drawWinLine();
        displayController.removeListeners();

        win = gameboard.checkForWinner();
        mark = win.mark;
        let winner;

        if (mark === player1.mark) {
            winner = player1;
            winner.addWin();
        } else if (mark === player2.mark) {
            winner = player2;
            winner.addWin();
        };

        displayController.updateScores();
        popUpController.showWinScreen();
        return winner;
    };

    return { playTurn, winHandler };
})();


const displayController = (function () {
    const gameArea = document.querySelector('.game-area');
    const gameCels = document.querySelectorAll('.game-cel');

    const setNames = (player1Name, player2Name) => {
        const player1NameDiv = document.querySelector('.player1.scoreboard .name');
        const player2NameDiv = document.querySelector('.player2.scoreboard .name');

        player1NameDiv.textContent = player1Name;
        player2NameDiv.textContent = player2Name;
    }

    const updateScores = () => {
        const player1ScoreDiv = document.querySelector('.player1.scoreboard .score');
        const player2ScoreDiv = document.querySelector('.player2.scoreboard .score');

        player1ScoreDiv.textContent = player1.getScore();
        player2ScoreDiv.textContent = player2.getScore();
    };

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
            game.winHandler();
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

    return { updateScreen, shakeScreen, drawWinLine, clearLineCanvas, addListeners, removeListeners, setNames, updateScores }
})();



const popUpController = (function () {
    const nameDialog = document.querySelector("#name-dialog");
    const form = document.querySelector("form");
    let player1Name;
    let player2Name;

    function createPlayers() {
        form.addEventListener('submit', (e) => {
            new FormData(form);
        });

        form.addEventListener("formdata", (e) => {
            const data = e.formData;
            player1Name =
                data.get("player_1") === ""
                    ? "Player 1"
                    : data.get("player_1");

            player2Name =
                data.get("player_2") === ""
                    ? "Player 2"
                    : data.get("player_2");

            player1.name = player1Name;
            player2.name = player2Name;

            displayController.setNames(player1Name, player2Name);

        });
    };

    createPlayers();


    function showNameInput() {
        nameDialog.showModal();
    }


    const winDialog = document.querySelector('#win-dialog');
    resetButton = document.querySelector('#win-dialog button');
    resetButton.addEventListener('click', () => {
        gameboard.reset();
        displayController.addListeners();
        displayController.clearLineCanvas();
        displayController.updateScreen();
        winDialog.close();
    });

    function showWinScreen() {
        setTimeout(() => {winDialog.showModal()}, 1400);
    }

    return { showNameInput, showWinScreen }
})();

displayController.addListeners();
popUpController.showNameInput();

