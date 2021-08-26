import Board from "./Board.js";

window.onload = () => {

let canvas = document.getElementById("canvas"); 

let board = new Board(canvas);
board.drawBoard();

let start = document.getElementById("start");

let board_size = document.getElementById("select-size");
let board_color = document.getElementById("board-color");

let initialShape = document.getElementById("initial-shape");
let player1_color = document.getElementById("player1-color");
let player2_color = document.getElementById("player2-color");

board_color.onchange = () => {
    board = new Board(canvas, 3, 3, board_size.value, board_size.value, board_color.value, player1_color.value, player2_color.value, initialShape.value);
    board.drawBoard();
}

board_size.onchange = () => {
    board = new Board(canvas, 3, 3, board_size.value, board_size.value, board_color.value, player1_color.value, player2_color.value, initialShape.value);
    board.drawBoard();
    document.getElementById("size").innerHTML = `Tamaño del tablero: ${board_size.value}x${board_size.value}`;
}

start.onclick = () => {
    board = new Board(canvas, 3, 3, board_size.value, board_size.value, board_color.value, player1_color.value, player2_color.value, initialShape.value);
    board.drawBoard();
    board.initGame();
}

}