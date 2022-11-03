export default class AI {
    constructor(board, player) {
        this.board = board;
        this.boardRepresentation = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
        this.player = player;
    }
    
    calculateMove(node, depth) {
        let maxValue = -Infinity;
        let move;
        for (let indexY = 0; indexY < 3; indexY++) {
            for (let indexX = 0; indexX < 3; indexX++) {
                if (node[indexY][indexX] === "") {
                    node[indexY].splice(indexX, 1, 0);
                    let evaluation = this.minimax(node, false, depth - 1);
                    node[indexY].splice(indexX, 1, "");
                    if (evaluation > maxValue) {
                        maxValue = evaluation;
                        move = [indexY, indexX, this.player.getCurrentPlayer];
                    }
                }
            }
        }
        this.boardRepresentation[move[0]][move[1]] = 0;
        this.board.drawPlayer(move);
    }

    minimax(node, maximizingPlayer, depth) {
        let checker = this.checkWinner(node);

        if (checker) {
            if (maximizingPlayer) {
                return -10;
            }
            else {
                return 10;
            }
        }
        else if (!checker && (!(node[0].includes(""))) && (!(node[1].includes(""))) && (!(node[2].includes("")))) {
            return 0;
        }

        if (maximizingPlayer) {
            let maxValue = -Infinity;

            for (let indexY = 0; indexY < 3; indexY++) {
                for (let indexX = 0; indexX < 3; indexX++) {
                    if (node[indexY][indexX] === "") {
                        node[indexY].splice(indexX, 1, 0);
                        let evaluation = this.minimax(node, false, depth - 1);
                        node[indexY].splice(indexX, 1, "");
                        maxValue = Math.max(evaluation, maxValue);
                    }
                }
            }
            return maxValue;
        }
        else {
            let minValue = Infinity;

            for (let indexY = 0; indexY < 3; indexY++) {
                for (let indexX = 0; indexX < 3; indexX++) {
                    if (node[indexY][indexX] === "") {
                        node[indexY].splice(indexX, 1, 1);
                        let evaluation = this.minimax(node, true, depth - 1);
                        node[indexY].splice(indexX, 1, "");
                        minValue = Math.min(evaluation, minValue);
                    }
                }
            }
            return minValue;
        }
    }

    checkWinner(position) {
        for (let i = 0; i < position.length; i++) {
            if (position[i][0] !== "" && position[i][0] === position[i][1] && position[i][1] === position[i][2]) {
                return true;
            }
            else if (position[0][i] !== "" && position[0][i] === position[1][i] && position[1][i] === position[2][i]) {
                return true;
            }
        }
        
        if (position[0][0] !== "" && position[0][0] === position[1][1] && position[1][1] === position[2][2]) {
            return true;
        }
        else if (position[0][2] !== "" && position[0][2] === position[1][1] && position[1][1] === position[2][0]) {
            return true;
        }

        return false;
    }

    dummyMove() {
        let indexX = Math.floor(Math.random() * this.board.getBoard.length);
        let indexY = Math.floor(Math.random() * this.board.getBoard.length);
        if (this.board.getBoard[indexY][indexX] !== "") {
            return this.dummyMove();
        }
        this.boardRepresentation[indexY][indexX] = 0;
        return this.board.drawPlayer([indexY, indexX, this.player.getCurrentPlayer]);
    }
}