export default class Draw {
    constructor(canvas) {
        this.canvas = canvas;
        if (this.canvas.getContext) {
            this.ctx = this.canvas.getContext('2d');
        }
    }
    
    drawRow(x, y, width, color) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 3.3;
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(width, y);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawColumn(x, y, height, color) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 3.3;
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x, height);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawDiagonal(fromX, fromY, toX, toY, color) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 3.3;
        this.ctx.moveTo(fromX, fromY);
        this.ctx.lineTo(toX, toY);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawCircle(x, y, radius, size, color) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, radius);
        this.ctx.lineWidth = 3.3;
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawCross(x, y, width, height, color) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 3.3;
        this.ctx.moveTo(x - width / 2, y - height / 2);
        this.ctx.lineTo(x - width / 2 + width, y - height / 2 + height);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 3.3;
        this.ctx.moveTo(x - width / 2 + width, y - height / 2);
        this.ctx.lineTo(x - width / 2, y - height / 2 + height);
        this.ctx.stroke();
        this.ctx.closePath();
    }
}