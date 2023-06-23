let currYear = document.querySelector('.currYear');
currYear.textContent = new Date().getFullYear();

const fieldElements = document.querySelectorAll(".field");

const playerXbtn = document.querySelector('.playerX');
const playerObtn = document.querySelector('.playerO');
const resetBtn = document.querySelector('.restartBtn');
const playAgainBtn = document.querySelector('.playAgain');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const message = document.querySelector('.message');


const Player = (sign) => {
    this.sign = sign;

    const getSign = () => {
        return sign;
    };

    return { getSign };
};


const gameboard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    const setField = (index, sign) => {
        if (index > board.length) return;
        board[index] = sign;
    };

    const getField = (index) => {
        if (index > board.length) return;
        return board[index];
    };

    return { reset, setField, getField };
})();


const displayController = (() => {

    fieldElements.forEach((field) =>
        field.addEventListener("click", (e) => {
            // if (gameController.getIsOver() || e.target.textContent !== "") return;
            if (e.target.textContent !== "") return;
            gameController.playRound(parseInt(e.target.dataset.index));
            updateGameboard();
            togglePlayer();
        })
    );

    const updateGameboard = () => {
        for (let i = 0; i < fieldElements.length; i++) {
            fieldElements[i].textContent = gameboard.getField(i);
        }
    };

    const togglePlayer = () => {
        playerXbtn.classList.toggle('selected');
        playerObtn.classList.toggle('selected');
    }

    const resetBoard = () => {
        gameboard.reset();
        gameController.reset();
        updateGameboard();
        playerXbtn.classList.add('selected');
        playerObtn.classList.remove('selected');
    }

    // reset buttons
    resetBtn.addEventListener("click", resetBoard);

    playAgainBtn.addEventListener("click", () => {
        resetBoard();
        modal.classList.remove('active');
        overlay.classList.remove('active');
    });

})();



const gameController = (() => {

    const playerX = Player("X");
    const playerO = Player("O");

    let round = 1;
    let isOver = false;

    const playRound = (fieldIndex) => {
        gameboard.setField(fieldIndex, getCurrentPlayerSign());

        if (checkWinner(fieldIndex)) {
            message.textContent = (`Player ${getCurrentPlayerSign()} has won!`);
            modal.classList.add('active');
            overlay.classList.add('active');
            isOver = true;
            return;
        }

        if (round === 9) {
            message.textContent = ("It's a draw!");
            modal.classList.add('active');
            overlay.classList.add('active');
            isOver = true;
            return;
        }

        round++;
        console.log(fieldIndex);
    }

    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
    };

    const getIsOver = () => {
        return isOver;
    };

    const reset = () => {
        round = 1;
        isOver = false;
    };

    // const winConditions = (arrayToCheck) => {
    //     return winConditions.some((combination) => {
    //         return combination.every((index) => arrayToCheck.includes(index));
    //     });
    // }

    const checkWinner = (fieldIndex) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winConditions
            .filter((combination) => combination.includes(fieldIndex))
            .some((possibleCombination) =>
                possibleCombination.every(
                    (index) => gameboard.getField(index) === getCurrentPlayerSign()
                )
            );
    };

    return { playRound, getIsOver, reset };
})();






