let turn = 'X';
let isGameOver = false;
let canClick = true;
document.querySelector('.result').innerText = turn + "'s turn";
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
}

const checkwin = () => {
    let boxtext = document.getElementsByClassName('writeValue');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    wins.forEach(ele => {
        if ((boxtext[ele[0]].innerText === boxtext[ele[1]].innerText) && (boxtext[ele[2]].innerText === boxtext[ele[1]].innerText) && (boxtext[ele[0]].innerText !== "")) {
            document.querySelector('.result').innerText = boxtext[ele[0]].innerText + " Won!"
            isGameOver = true;
            canClick = false;
            if (ele[0] === 0) {
                if (ele[1] === 1) {
                    document.getElementById('horizon1').style.display = 'block';
                } else if (ele[1] === 3) {
                    document.getElementById('vertical1').style.display = 'block';
                } else if (ele[1] === 4) {
                    document.getElementById('diagonal').style.display = 'block';
                }
            } else if (ele[0] === 2) {
                if (ele[1] === 5) {
                    document.getElementById('vertical3').style.display = 'block';
                } else if (ele[1] === 4) {
                    document.getElementById('revdiagonal').style.display = 'block';
                }
            } else if (ele[0] == 3) {
                document.getElementById('horizon2').style.display = 'block';
            } else if (ele[0] == 6) {
                document.getElementById('horizon3').style.display = 'block';
            } else if (ele[0] == 1) {
                document.getElementById('vertical2').style.display = 'block';
            }
        }
    })
}
let count = 0;
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.writeValue');
    element.addEventListener('click', (e) => {
        if (canClick === true) {
            if (boxtext?.innerText === "") {
                let click = new Audio("click.wav");
                if (turn == 'X') {
                    e.target.style.color = "red";
                } else {
                    e.target.style.color = "#00ABF0";
                }
                boxtext.innerHTML = turn;
                click.play();
                count = count + 1;
                turn = changeTurn();
                checkwin();
                if (isGameOver) {
                    turn = changeTurn();
                    document.getElementById('gif').style.display = "block";
                    audio = new Audio("success-fanfare-trumpets-6185.mp3");
                    audio.play();
                    setTimeout(() => {
                        resetValues();
                    }, 3000);
                } else if (count == 9) {
                    document.querySelector('.result').innerText = " Game tied!"
                    audio = new Audio("gametied.wav");
                    audio.play();
                    setTimeout(() => {
                        resetValues();
                    }, 3000);
                } else {
                    document.getElementsByClassName('result')[0].innerText = ` ${turn}'s turn `;
                }
            }
        }
    })
})

document.getElementsByClassName('button')[0].addEventListener('click', resetValues);

function resetValues() {
    let boxtext = document.querySelectorAll(".writeValue")
    Array.from(boxtext).forEach(element => {
        element.innerText = "";
        turn = 'X';
        isGameOver = false;
        document.querySelector('.result').innerText = ` ${turn}'s turn `;
        document.getElementById('gif').style.display = "none";
        count = 0;
    });

    let linarr = document.querySelectorAll(".line");
    Array.from(linarr).forEach(element => {
        console.log(element);

        element.style.display = 'none';
    });
    canClick = true;
}