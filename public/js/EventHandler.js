export default class EventHandler {
    constructor(canvas, board, player, gamemode, AI) {
        this.canvas = canvas;
        this.gamemode = gamemode;
        this.AI = AI;
        this.board = board;
        this.player = player;
    }

    handleEvent() {
        if (this.gamemode === "Human") {
            this.canvas.onclick = e => {
                let x = e.pageX + (this.canvas.getAttribute('width') / 2) - this.canvas.offsetLeft;
                let y = e.pageY + (this.canvas.getAttribute('height') / 2) - this.canvas.offsetTop;
                let arr = this.board.toIndex(x, y); arr.push(this.player.getCurrentPlayer);
                if (this.board.getBoard[arr[0]][arr[1]] === "") {
                    this.board.drawPlayer(arr);
                    let winner = this.player.checkWinner();
                    let isTie = this.player.checkTie();
                    this.player.currentPlayer = this.player.currentPlayer === 0 ? 1 : 0;
                    if (winner[0]) {
                        return this.board.finalizeGame();
                    }
                    else if (isTie) {
                        return this.board.finalizeGame();
                    }
                }
            };
        }
        else {
            this.canvas.onclick = e => {
                let x = e.pageX + (this.canvas.getAttribute('width') / 2) - this.canvas.offsetLeft;
                let y = e.pageY + (this.canvas.getAttribute('height') / 2) - this.canvas.offsetTop;
                let arr = this.board.toIndex(x, y); arr.push(this.player.getCurrentPlayer);
                if (this.board.getBoard[arr[0]][arr[1]] === "") {
                    this.AI.boardRepresentation[arr[0]][arr[1]] = 1;
                    this.board.drawPlayer(arr);
                    let winner = this.player.checkWinner();
                    let isTie = this.player.checkTie();
                    this.player.currentPlayer = this.player.getCurrentPlayer === 0 ? 1 : 0;
                    if (winner[0]) {
                        return this.board.finalizeGame();
                    }
                    else if (isTie) {
                        return this.board.finalizeGame();
                    } 
                    else {
                        this.AI.calculateMove(this.AI.boardRepresentation);
                        winner = this.player.checkWinner();
                        isTie = this.player.checkTie();
                        this.player.currentPlayer = this.player.getCurrentPlayer === 0 ? 1 : 0;
                        if (winner[0]) {
                            return this.board.finalizeGame();
                        }
                        else if (isTie) {
                            return this.board.finalizeGame();
                        } 
                    }
                }
            }
        }
    }

    removeEvent() {
        this.canvas.onclick = () => {
            return;
        };
    }
}