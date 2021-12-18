const info = document.querySelector('.info');
const cells = Array.from(document.querySelectorAll('.cell'));
const winner = document.querySelector('.winner');

let game = ['','','','','','','','',''];
let player = "X";
let gameActive = true;

// win conditions
const x_won = 'Player X won';
const o_won = 'Player O won';
const tie = 'Tie';

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleResultValidation() {
    let roundWon = false;

    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = game[winCondition[0]];
        const b = game[winCondition[1]];
        const c = game[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        announce(player === 'X' ? x_won : o_won);
        gameActive = false;
        return;
    }

    if (!game.includes('')) announce(tie);
}

handleResultValidation();

const announce = (type) => {
    switch (type) {
        case x_won:
            winner.innerHTML = `Player <span class="playerX">X</span> Won`;
            break;
        case o_won:
            winner.innerHTML = `Player <span class="playerO">O</span> Won`;
            break;
        case tie:
            winner.innerText = 'Tie';
    }
}

const isValidAction = (cell) => {
    if (cell === 'X' || cell === 'O') return false;

    return true;
}

const updateBoard = (index) => {
    game[index] = player;
}

const changePlayer = () => {
    info.classList.remove(`player${player}`);
    player = player === 'X' ? 'O' : 'X';
    info.innerText = player;
    info.classList.add(`player${player}`);
}

const userAction = (cell, index) => {
    if (isValidAction(cell) && gameActive) {
        cell.innerText = player;
        cell.classList.add(`player${player}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
    }
}

const resetBoard = () => {
    game = ['','','','','','','','',''];
    gameActive = true;
    winner.innerHTML = `Player <span class="info playerX">X</span>'s turn`;

    if (player === 'O') changePlayer();

    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove(`playerX`);
        cell.classList.remove(`playerO`);
    })
}

cells.forEach( (cell, index) => {
    cell.addEventListener('click', () => userAction(cell, index));
})

btnReset.addEventListener('click', resetBoard);