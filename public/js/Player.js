import Draw from "./Draw.js";

export default class Player {
    constructor(canvas, board, color1, color2, initialShape) {
        this.canvas = canvas;
        this.board = board;
        this.currentShape = initialShape;
        this.currentPlayer = 0;
        this.color = new Map().set(0, color1).set(1, color2);
        this.drawCanvas = new Draw(this.canvas);
    }

    drawShape(x, y, width, height) {
        if (this.currentShape === "cross") {
            this.drawCanvas.drawCross(x, y, width, height, this.color.get(this.currentPlayer));
            this.currentShape = "circle";
            this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
        }
        else {
            this.drawCanvas.drawCircle(x, y, (Math.PI / 180) * 360, (((width + height) / 2) / 2), this.color.get(this.currentPlayer));
            this.currentShape = "cross";
            this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
        }
    }

    checkWinner() {
        for (let i = 0; i < this.board.getBoard.length; i++) {
            if (this.board.getBoard[i][0] !== "" && this.board.getBoard[i][0] === this.board.getBoard[i][1] && this.board.getBoard[i][1] === this.board.getBoard[i][2]) {
                this.drawCanvas.drawRow(0, Math.trunc(this.board.height / this.board.rows) / 2 + Math.trunc(this.board.height / this.board.rows) * i, this.board.width, this.color.get(this.currentPlayer));
                return [true, this.currentShape];
            }
            else if (this.board.getBoard[0][i] !== "" && this.board.getBoard[0][i] === this.board.getBoard[1][i] && this.board.getBoard[1][i] === this.board.getBoard[2][i]) {
                this.drawCanvas.drawColumn(Math.trunc(this.board.width / this.board.columns) / 2 + Math.trunc(this.board.width / this.board.columns) * i, 0, this.board.height, this.color.get(this.currentPlayer));
                return [true, this.currentShape];
            }
        }

        if (this.board.getBoard[0][0] !== "" && this.board.getBoard[0][0] === this.board.getBoard[1][1] && this.board.getBoard[1][1] === this.board.getBoard[2][2]) {
            this.drawCanvas.drawDiagonal(0, 0, Math.trunc(this.board.height / this.board.rows) + this.board.height, (this.board.width / this.board.columns) + this.board.width, this.color.get(this.currentPlayer));
            return [true, this.currentShape];
        }
        else if (this.board.getBoard[0][2] !== "" && this.board.getBoard[0][2] === this.board.getBoard[1][1] && this.board.getBoard[1][1] === this.board.getBoard[2][0]) {
            this.drawCanvas.drawDiagonal(this.board.width, 0, 0, this.board.height, this.color.get(this.currentPlayer));
            return [true, this.currentShape];
        }

        return [false];
    }

    get getCurrentPlayer() {
        return this.currentPlayer;
    }
}
