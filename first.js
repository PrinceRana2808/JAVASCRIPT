let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newgamebtn = document.querySelector("#newbtn");
let msgcontainer = document.querySelector(".msg-cont");
let msg = document.querySelector("#msg");
let turnIndicator = document.querySelector("#turn-indicator");

let turnO = true;
let currentPlayer = "O";  // Initialize currentPlayer

const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const checkWinner = () => {
    for (let pattern of winpatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showwinner(pos1val);
                disabledboxes();
                return true;  // Return true if a winner is found
            }
        }
    }
    return false;  // Return false if no winner is found
};

const showwinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
};

const disabledboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enabledboxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};""

const resetgame = () => {
    turnO = true;
    currentPlayer = "O";  // Reset currentPlayer
    enabledboxes();
    msgcontainer.classList.add("hide");
    turnIndicator.innerText = `Current Player: ${currentPlayer}`;
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            box.innerText = currentPlayer;
            box.disabled = true;
            if (!checkWinner()) {
                currentPlayer = currentPlayer === "O" ? "X" : "O";
                turnIndicator.innerText = ` Player Turn: ${currentPlayer}`;
            }
        }
    });
});

newgamebtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);
