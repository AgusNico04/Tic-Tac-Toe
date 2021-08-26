export default class EventHandler {
    constructor(canvas, board, player) {
        this.canvas = canvas;
        this.board = board;
        this.player = player;
        this.container = document.getElementById('container');
    }

    handleEvent() {
        this.canvas.onclick = e => {
            let x = e.pageX + (this.canvas.getAttribute('width') / 2) - this.canvas.offsetLeft;
            let y = e.pageY + (this.canvas.getAttribute('height') / 2) - this.canvas.offsetTop;
            let arr = this.board.toIndex(x, y); arr.push(this.player.getCurrentPlayer);
            this.board.drawPlayer(arr);
        };
    }

    removeEvent() {
        this.canvas.onclick = () => {
            return;
        };
    }
}