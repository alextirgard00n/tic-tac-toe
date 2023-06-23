let currYear = document.querySelector('.currYear');
currYear.textContent = new Date().getFullYear();

// let count = 0;
// const playerX = document.querySelector('.playerX');
// const playerO = document.querySelector('.playerO');

// const resetBtn = document.querySelector('.restartBtn');

// playerX.classList.toggle('selected');

// const field = document.querySelectorAll('.field');

// field.forEach(element => element.addEventListener('click', fieldClick));

// function fieldClick() {
//     if (this.textContent !== '') return;

//     if (count % 2 === 0) {
//         this.textContent = 'X'
//         count++;
//         playerX.classList.toggle('selected');
//         playerO.classList.toggle('selected');
//     } else {
//         this.textContent = 'O';
//         count++;
//         playerX.classList.toggle('selected');
//         playerO.classList.toggle('selected');
//     }
// }

// resetBtn.addEventListener("click", resetFields);

// function resetFields() {
//     field.forEach(element => {
//         element.textContent = '';
//     });
//     count = 0;
//     playerX.classList.add('selected');
//     playerO.classList.remove('selected');
// }


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

    //not needed, for testing purposes only 
    const printBoard = () => {
        for (let i = 0; i < board.length; i++) {
            console.log(board[i]);
        }
    }

    return { reset, setField, getField, printBoard, board };
})();


const displayController = (() => {
    const fieldElements = document.querySelectorAll(".field");
    const playerX = document.querySelector('.playerX');
    const playerO = document.querySelector('.playerO');
    const resetBtn = document.querySelector('.restartBtn');

    resetBtn.addEventListener("click", gameboard.reset());

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
        playerX.classList.toggle('selected');
        playerO.classList.toggle('selected');
    }



    return { updateGameboard };

})();



const gameController = (() => {

    const playerX = Player("X");
    const playerO = Player("O");

    const playerXbtn = document.querySelector('.playerX');
    const playerObtn = document.querySelector('.playerO');
    let round = 1;
    let isOver = false;

    const playRound = (fieldIndex) => {
        gameboard.setField(fieldIndex, getCurrentPlayerSign());
        round++;
    }

    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
    };

    // return { playRound, getIsOver, reset };
    return { playRound };
})();






