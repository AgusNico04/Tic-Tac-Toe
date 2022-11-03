import Draw from "./Draw.js";
import AI from "./AI.js";
import EventHandler from "./EventHandler.js";
import Player from "./Player.js";

export default class Board {
    constructor(canvas, width = 420, height = 420, color = "#000000", gamemode = "Human", player1_color = "red", player2_color = "blue", initialShape = "cross") {
        this.canvas = canvas;
        this.canvas.setAttribute("width", width);
        this.canvas.setAttribute("height", height);
        this.width = width;
        this.height = height;
        this.color = color;
        this.rows = 3;
        this.columns = 3;
        this.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
        this.drawCanvas = new Draw(this.canvas);
        this.gamemode = gamemode;
        this.player = new Player(this.canvas, this, player1_color, player2_color, initialShape);
        this.AI = new AI(this, this.player);
        this.eventHandler = new EventHandler(this.canvas, this, this.player, this.gamemode, this.AI);
    }

    drawBoard() {
        for (let i = 0; i < this.rows - 1; i++) {
            this.drawCanvas.drawRow(0, (this.height / this.rows) + i * (this.height / this.rows), this.width, this.color);
        }
        for (let i = 0; i < this.columns - 1; i++) {
            this.drawCanvas.drawColumn((this.width / this.columns) + i * (this.width / this.columns), 0, this.height, this.color);
        }
    }

    initGame() {
        if (this.gamemode === "AI_first") {
            this.AI.dummyMove();
            this.player.currentPlayer = 1;
        }

        this.eventHandler.handleEvent();
    }

    toIndex(x, y) {
        let indexX = Math.trunc(x / Math.trunc(this.width / this.columns));
        let indexY = Math.trunc(y / Math.trunc(this.height / this.rows));
        return [indexY, indexX];
    }

    toCoordinates(indexY, indexX) {
        let coordX = Math.trunc(this.width / this.columns / 2) + indexX * Math.trunc(this.width / this.columns);
        let coordY = Math.trunc(this.height / this.rows / 2) + indexY * Math.trunc(this.height / this.rows);
        return [coordX, coordY];
    }

    drawPlayer(arr) {
        this.board[arr[0]][arr[1]] = arr[2];
        this.player.drawShape(...(this.toCoordinates(arr[0], arr[1])), Math.floor(((this.width / this.columns) / 2) + Math.floor(((this.width / this.columns) / 2) / 2)), Math.floor(((this.height / this.rows) / 2) + Math.floor(((this.height / this.rows) / 2) / 2)));       
    }

    finalizeGame() {
        return this.eventHandler.removeEvent();
    }

    get getBoard() {
        return this.board;
    }
}