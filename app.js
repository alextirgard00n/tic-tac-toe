let currYear = document.querySelector('.currYear');
currYear.textContent = new Date().getFullYear();

let count = 0;
const playerX = document.querySelector('.playerX');
const playerO = document.querySelector('.playerO');

const resetBtn = document.querySelector('.restartBtn');

playerX.classList.toggle('selected');

const field = document.querySelectorAll('.field');

field.forEach(element => element.addEventListener('click', fieldClick));

function fieldClick() {
    if (this.textContent !== '') {
        console.log('nope');
        return;
    }

    if (count % 2 === 0) {
        this.textContent = 'X'
        count++;
        playerX.classList.toggle('selected');
        playerO.classList.toggle('selected');
    } else {
        this.textContent = 'O';
        count++;
        playerX.classList.toggle('selected');
        playerO.classList.toggle('selected');
    }
}

resetBtn.addEventListener("click", resetFields);

function resetFields() {
    field.forEach(element => {
        element.textContent = '';
    });
    count = 0;
    playerX.classList.add('selected');
    playerO.classList.remove('selected');
}