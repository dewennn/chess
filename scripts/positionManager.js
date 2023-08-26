export class PositionManager{
    constructor(chessPieces){
        this._chessPieces = chessPieces;
        this._checkEmpty = (x, y) => {
            return this._chessPieces[x][y] === 0 ? true : false;
        }
        this._checkColor = (x, y, color) => {
            if(x < 0 || x > 7 || y < 0 || y > 7 || this._chessPieces[x][y] === 0) return false;

            if(color === 'black'){
                if(this._chessPieces[x][y].color === 'black'){
                    return true;
                }
                else{
                    return false;
                }
            }
            else if(color === 'white'){
                if(this._chessPieces[x][y].color === 'white'){
                    return true;
                }
                else{
                    return false;
                }
            }
        }

        this._findKing = (color) => {
            let king;
            this._chessPieces.forEach((row) => {
                row.forEach((piece) => {
                    if(piece !== 0){
                        if(piece.name === 'King' && piece.color === color){
                            king = piece;
                        }
                    }
                });
            });
            return king;
        }
        this._kingInDanger = (color) => {
            const king = this._findKing(color);
            const enemy = color === 'white' ? 'black' : 'white';
            let result = false;

            this._chessPieces.forEach((row) => {

                row.forEach((piece) => {
                    if(piece !== 0 && piece.color === enemy){
                        piece.possibleMoves.forEach((move) => {
                            if(move[0] === king.position[0] && move[1] === king.position[1]){
                                result = true;
                            }
                        });
                    }
                });
            });

            return result;
        }
        this._checkKing = (start, end, color) => {
            const [x, y] = start;
            const [xx, yy] = end;

            const temp = this._chessPieces[xx][yy];

            if(this._chessPieces[xx][yy] !== 0) this._chessPieces[xx][yy] = 0;

            this._chessPieces[xx][yy] = this._chessPieces[x][y];
            this._chessPieces[x][y] = 0;
            this._chessPieces[xx][yy].position = [xx, yy];

            const enemy = color === 'white' ? 'black' : 'white';
            this._updatePossibleMoveEnemy(enemy);
            
            if(this._kingInDanger(color)){
                this._chessPieces[x][y] = this._chessPieces[xx][yy];
                this._chessPieces[xx][yy] = temp;
                this._chessPieces[x][y].position = [x, y];
                return true;
            }
            else{
                this._chessPieces[x][y] = this._chessPieces[xx][yy];
                this._chessPieces[xx][yy] = temp;
                this._chessPieces[x][y].position = [x, y];
                return false;
            }
        }

        this._checkMate = (color) => {
            let onlyKings = true;

            this._chessPieces.forEach((line) => {
                line.forEach((piece) => {
                    if(piece !== 0 && piece.name !== 'King'){
                        onlyKings = false;
                    }
                });
            });

            if(onlyKings) return 'stalemate';

            const danger = this._kingInDanger(color);
            this._updatePossibleMove(color);
            let cantMove = true;

            this._chessPieces.forEach((line) => {
                line.forEach((piece) => {
                    if(piece !== 0 && piece.color === color){
                        if(piece.possibleMoves.length > 0){
                            cantMove = false;
                        }
                    }
                });
            });
            
            if(cantMove && danger) return 'checkmate';
            else if(cantMove && !danger) return 'stalemate';
            else return 'play';
        }

        this._pawn = (piece) => {
            const [x, y] = piece.position;
            piece.clearPossibleMoves();

            if(piece.color === 'black'){
                if(piece.firstMove === true){
                    if(this._checkEmpty(x + 1, y) && !this._checkKing([x, y], [x+1, y], piece.color)){
                        piece.addPossibleMoves([x + 1, y]);
                        if(this._checkEmpty(x + 2, y) && !this._checkKing([x, y], [x+2, y], piece.color)){
                            piece.addPossibleMoves([x + 2, y]);
                        }
                    }
                    if(this._checkColor(x + 1, y + 1, 'white') && !this._checkKing([x, y], [x+1, y+1], piece.color)){
                        piece.addPossibleMoves([x + 1, y + 1]);
                    }
                    if(this._checkColor(x + 1, y - 1, 'white') && !this._checkKing([x, y], [x+1, y-1], piece.color)){
                        piece.addPossibleMoves([x + 1, y - 1]);
                    }
                }
                else{
                    if(this._checkEmpty(x + 1, y) && !this._checkKing([x, y], [x+1, y], piece.color)){
                        piece.addPossibleMoves([x + 1, y]);
                    }
                    if(this._checkColor(x + 1, y + 1, 'white') && !this._checkKing([x, y], [x+1, y+1], piece.color)){
                        piece.addPossibleMoves([x + 1, y + 1]);
                    }
                    if(this._checkColor(x + 1, y - 1, 'white') && !this._checkKing([x, y], [x+1, y-1], piece.color)){
                        piece.addPossibleMoves([x + 1, y - 1]);
                    }
                }
            }
            else if(piece.color === 'white'){
                if(piece.firstMove === true){
                    if(this._checkEmpty(x - 1, y) && !this._checkKing([x, y], [x-1, y], piece.color)){
                        piece.addPossibleMoves([x - 1, y]);
                        if(this._checkEmpty(x - 2, y) && !this._checkKing([x, y], [x-2, y], piece.color)){
                            piece.addPossibleMoves([x - 2, y]);
                        }
                    }
                    if(this._checkColor(x - 1, y + 1, 'black') && !this._checkKing([x, y], [x-1, y+1], piece.color)){
                        piece.addPossibleMoves([x - 1, y + 1]);
                    }
                    if(this._checkColor(x - 1, y - 1, 'black') && !this._checkKing([x, y], [x-1, y-1], piece.color)){
                        piece.addPossibleMoves([x - 1, y - 1]);
                    }
                }
                else{
                    if(this._checkEmpty(x - 1, y) && !this._checkKing([x, y], [x-1, y], piece.color)){
                        piece.addPossibleMoves([x - 1, y]);
                    }
                    if(this._checkColor(x - 1, y + 1, 'black') && !this._checkKing([x, y], [x-1, y+1], piece.color)){
                        piece.addPossibleMoves([x - 1, y + 1]);
                    }
                    if(this._checkColor(x - 1, y - 1, 'black') && !this._checkKing([x, y], [x-1, y-1], piece.color)){
                        piece.addPossibleMoves([x - 1, y - 1]);
                    }
                }
            }
        }

        this._pawnEnemy = (piece) => {
            const [x, y] = piece.position;
            piece.clearPossibleMoves();

            if(piece.color === 'black'){
                if(piece.firstMove === true){
                    if(this._checkEmpty(x + 1, y)){
                        piece.addPossibleMoves([x + 1, y]);
                        if(this._checkEmpty(x + 2, y)){
                            piece.addPossibleMoves([x + 2, y]);
                        }
                    }
                    if(this._checkColor(x + 1, y + 1, 'white')){
                        piece.addPossibleMoves([x + 1, y + 1]);
                    }
                    if(this._checkColor(x + 1, y - 1, 'white')){
                        piece.addPossibleMoves([x + 1, y - 1]);
                    }
                }
                else{
                    if(this._checkEmpty(x + 1, y)){
                        piece.addPossibleMoves([x + 1, y]);
                    }
                    if(this._checkColor(x + 1, y + 1, 'white')){
                        piece.addPossibleMoves([x + 1, y + 1]);
                    }
                    if(this._checkColor(x + 1, y - 1, 'white')){
                        piece.addPossibleMoves([x + 1, y - 1]);
                    }
                }
            }
            else if(piece.color === 'white'){
                if(piece.firstMove === true){
                    if(this._checkEmpty(x - 1, y)){
                        piece.addPossibleMoves([x - 1, y]);
                        if(this._checkEmpty(x - 2, y)){
                            piece.addPossibleMoves([x - 2, y]);
                        }
                    }
                    if(this._checkColor(x - 1, y + 1, 'black')){
                        piece.addPossibleMoves([x - 1, y + 1]);
                    }
                    if(this._checkColor(x - 1, y - 1, 'black')){
                        piece.addPossibleMoves([x - 1, y - 1]);
                    }
                }
                else{
                    if(this._checkEmpty(x - 1, y)){
                        piece.addPossibleMoves([x - 1, y]);
                    }
                    if(this._checkColor(x - 1, y + 1, 'black')){
                        piece.addPossibleMoves([x - 1, y + 1]);
                    }
                    if(this._checkColor(x - 1, y - 1, 'black')){
                        piece.addPossibleMoves([x - 1, y - 1]);
                    }
                }
            }
        }

        this._horse = (piece) => {
            const [x, y] = piece.position;
            piece.clearPossibleMoves();

            if(x + 2 < 8 && y + 1 < 8 && !this._checkColor(x+2, y+1, piece.color) && !this._checkKing([x, y], [x+2, y+1], piece.color)){
                piece.addPossibleMoves([x + 2, y + 1]);
            }
            if(x + 2 < 8 && y - 1 >= 0 && !this._checkColor(x+2, y-1, piece.color) && !this._checkKing([x, y], [x+2, y-1], piece.color)){
                piece.addPossibleMoves([x + 2, y - 1]);
            }
            if(x + 1 < 8 && y + 2 < 8 && !this._checkColor(x+1, y+2, piece.color) && !this._checkKing([x, y], [x+1, y+2], piece.color)){
                piece.addPossibleMoves([x + 1, y + 2]);
            }
            if(x + 1 < 8 && y - 2 >= 0 && !this._checkColor(x+1, y-2, piece.color) && !this._checkKing([x, y], [x+1, y-2], piece.color)){
                piece.addPossibleMoves([x + 1, y - 2]);
            }
            if(x - 2 >= 0 && y + 1 < 8 && !this._checkColor(x-2, y+1, piece.color) && !this._checkKing([x, y], [x-2, y+1], piece.color)){
                piece.addPossibleMoves([x - 2, y + 1]);
            }
            if(x - 2 >= 0 && y - 1 >= 0 && !this._checkColor(x-2, y-1, piece.color) && !this._checkKing([x, y], [x-2, y-1], piece.color)){
                piece.addPossibleMoves([x - 2, y - 1]);
            }
            if(x - 1 >= 0 && y + 2 < 8 && !this._checkColor(x-1, y+2, piece.color) && !this._checkKing([x, y], [x-1, y+2], piece.color)){
                piece.addPossibleMoves([x - 1, y + 2]);
            }
            if(x - 1 >= 0 && y - 2 >= 0 && !this._checkColor(x-1, y-2, piece.color) && !this._checkKing([x, y], [x-1, y-2], piece.color)){
                piece.addPossibleMoves([x - 1, y - 2]);
            }
        }

        this._horseEnemy = (piece) => {
            const [x, y] = piece.position;
            piece.clearPossibleMoves();

            if(x + 2 < 8 && y + 1 < 8 && !this._checkColor(x+2, y+1, piece.color)){
                piece.addPossibleMoves([x + 2, y + 1]);
            }
            if(x + 2 < 8 && y - 1 >= 0 && !this._checkColor(x+2, y-1, piece.color)){
                piece.addPossibleMoves([x + 2, y - 1]);
            }
            if(x + 1 < 8 && y + 2 < 8 && !this._checkColor(x+1, y+2, piece.color)){
                piece.addPossibleMoves([x + 1, y + 2]);
            }
            if(x + 1 < 8 && y - 2 >= 0 && !this._checkColor(x+1, y-2, piece.color)){
                piece.addPossibleMoves([x + 1, y - 2]);
            }
            if(x - 2 >= 0 && y + 1 < 8 && !this._checkColor(x-2, y+1, piece.color)){
                piece.addPossibleMoves([x - 2, y + 1]);
            }
            if(x - 2 >= 0 && y - 1 >= 0 && !this._checkColor(x-2, y-1, piece.color)){
                piece.addPossibleMoves([x - 2, y - 1]);
            }
            if(x - 1 >= 0 && y + 2 < 8 && !this._checkColor(x-1, y+2, piece.color)){
                piece.addPossibleMoves([x - 1, y + 2]);
            }
            if(x - 1 >= 0 && y - 2 >= 0 && !this._checkColor(x-1, y-2, piece.color)){
                piece.addPossibleMoves([x - 1, y - 2]);
            }
        }

        this._bishop = (piece) => {
            const [x, y] = piece.position;
            piece.clearPossibleMoves();

            let xTemp = x, yTemp = y;

            const enemy = piece.color === 'black' ? 'white' : 'black';

            while(xTemp < 7 && yTemp < 7){
                xTemp++;
                yTemp++;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                if(this._checkKing([x, y], [xTemp, yTemp], piece.color)) continue;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(xTemp < 7 && yTemp > 0){
                xTemp++;
                yTemp--;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                if(this._checkKing([x, y], [xTemp, yTemp], piece.color)) continue;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(xTemp > 0 && yTemp < 7){
                xTemp--;
                yTemp++;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                if(this._checkKing([x, y], [xTemp, yTemp], piece.color)) continue;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(xTemp > 0 && yTemp > 0){
                xTemp--;
                yTemp--;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                if(this._checkKing([x, y], [xTemp, yTemp], piece.color)) continue;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }
        }

        this._bishopEnemy = (piece) => {
            const [x, y] = piece.position;
            piece.clearPossibleMoves();

            let xTemp = x, yTemp = y;

            const enemy = piece.color === 'black' ? 'white' : 'black';

            while(xTemp < 7 && yTemp < 7){
                xTemp++;
                yTemp++;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(xTemp < 7 && yTemp > 0){
                xTemp++;
                yTemp--;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(xTemp > 0 && yTemp < 7){
                xTemp--;
                yTemp++;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(xTemp > 0 && yTemp > 0){
                xTemp--;
                yTemp--;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }
        }

        this._rook = (piece) => {
            const [x, y] = piece.position;
            piece.clearPossibleMoves();

            let xTemp = x, yTemp = y;

            const enemy = piece.color === 'black' ? 'white' : 'black';

            while(xTemp < 7){
                xTemp++;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                if(this._checkKing([x, y], [xTemp, yTemp], piece.color)) continue;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(xTemp > 0){
                xTemp--;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                if(this._checkKing([x, y], [xTemp, yTemp], piece.color)) continue;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(yTemp < 7){
                yTemp++;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                if(this._checkKing([x, y], [xTemp, yTemp], piece.color)) continue;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(yTemp > 0){
                yTemp--;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                if(this._checkKing([x, y], [xTemp, yTemp], piece.color)) continue;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }
        }

        this._rookEnemy = (piece) => {
            const [x, y] = piece.position;
            piece.clearPossibleMoves();

            let xTemp = x, yTemp = y;

            const enemy = piece.color === 'black' ? 'white' : 'black';

            while(xTemp < 7){
                xTemp++;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(xTemp > 0){
                xTemp--;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(yTemp < 7){
                yTemp++;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(yTemp > 0){
                yTemp--;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }
        }

        this._queen = (piece) => {
            const [x, y] = piece.position;
            piece.clearPossibleMoves();

            let xTemp = x, yTemp = y;

            const enemy = piece.color === 'black' ? 'white' : 'black';

            while(xTemp < 7 && yTemp < 7){
                xTemp++;
                yTemp++;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                if(this._checkKing([x, y], [xTemp, yTemp], piece.color)) continue;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(xTemp < 7 && yTemp > 0){
                xTemp++;
                yTemp--;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                if(this._checkKing([x, y], [xTemp, yTemp], piece.color)) continue;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(xTemp > 0 && yTemp < 7){
                xTemp--;
                yTemp++;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                if(this._checkKing([x, y], [xTemp, yTemp], piece.color)) continue;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(xTemp > 0 && yTemp > 0){
                xTemp--;
                yTemp--;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                if(this._checkKing([x, y], [xTemp, yTemp], piece.color)) continue;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(xTemp < 7){
                xTemp++;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                if(this._checkKing([x, y], [xTemp, yTemp], piece.color)) continue;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(xTemp > 0){
                xTemp--;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                if(this._checkKing([x, y], [xTemp, yTemp], piece.color)) continue;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(yTemp < 7){
                yTemp++;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                if(this._checkKing([x, y], [xTemp, yTemp], piece.color)) continue;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(yTemp > 0){
                yTemp--;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                if(this._checkKing([x, y], [xTemp, yTemp], piece.color)) continue;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }
        }

        this._queenEnemy = (piece) => {
            const [x, y] = piece.position;
            piece.clearPossibleMoves();

            let xTemp = x, yTemp = y;

            const enemy = piece.color === 'black' ? 'white' : 'black';

            while(xTemp < 7 && yTemp < 7){
                xTemp++;
                yTemp++;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(xTemp < 7 && yTemp > 0){
                xTemp++;
                yTemp--;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(xTemp > 0 && yTemp < 7){
                xTemp--;
                yTemp++;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(xTemp > 0 && yTemp > 0){
                xTemp--;
                yTemp--;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(xTemp < 7){
                xTemp++;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(xTemp > 0){
                xTemp--;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(yTemp < 7){
                yTemp++;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(yTemp > 0){
                yTemp--;
                if(this._checkColor(xTemp, yTemp, piece.color)) break;
                piece.addPossibleMoves([xTemp, yTemp]);
                if(this._checkColor(xTemp, yTemp, enemy)) break;
            }
        }

        this._king = (piece) => {
            const [x, y] = piece.position;
            piece.clearPossibleMoves();

            if(x + 1 < 8 && y + 1 < 8 && !this._checkColor(x+1, y+1, piece.color) && !this._checkKing([x, y], [x+1, y+1], piece.color)){
                piece.addPossibleMoves([x + 1, y + 1]);
            }
            if(x + 1 < 8 && y - 1 >= 0 && !this._checkColor(x+1, y-1, piece.color) && !this._checkKing([x, y], [x+1, y-1], piece.color)){
                piece.addPossibleMoves([x + 1, y - 1]);
            }
            if(x - 1 >= 0 && y + 1 < 8 && !this._checkColor(x-1, y+1, piece.color) && !this._checkKing([x, y], [x-1, y+1], piece.color)){
                piece.addPossibleMoves([x - 1, y + 1]);
            }
            if(x - 1 >= 0 && y - 1 >= 0 && !this._checkColor(x-1, y-1, piece.color) && !this._checkKing([x, y], [x-1, y-1], piece.color)){
                piece.addPossibleMoves([x - 1, y - 1]);
            }
            if(x + 1 < 8 && !this._checkColor(x+1, y, piece.color) && !this._checkKing([x, y], [x+1, y], piece.color)){
                piece.addPossibleMoves([x + 1, y]);
            }
            if(x - 1 >= 0 && !this._checkColor(x-1, y, piece.color) && !this._checkKing([x, y], [x-1, y], piece.color)){
                piece.addPossibleMoves([x - 1, y]);
            }
            if(y + 1 < 8 && !this._checkColor(x, y+1, piece.color) && !this._checkKing([x, y], [x, y+1], piece.color)){
                piece.addPossibleMoves([x, y + 1]);
            }
            if(y - 1 >= 0 && !this._checkColor(x, y-1, piece.color) && !this._checkKing([x, y], [x, y-1], piece.color)){
                piece.addPossibleMoves([x, y - 1]);
            }
        }

        this._kingEnemy = (piece) => {
            const [x, y] = piece.position;
            piece.clearPossibleMoves();

            if(x + 1 < 8 && y + 1 < 8 && !this._checkColor(x+1, y+1, piece.color)){
                piece.addPossibleMoves([x + 1, y + 1]);
            }
            if(x + 1 < 8 && y - 1 >= 0 && !this._checkColor(x+1, y-1, piece.color)){
                piece.addPossibleMoves([x + 1, y - 1]);
            }
            if(x - 1 >= 0 && y + 1 < 8 && !this._checkColor(x-1, y+1, piece.color)){
                piece.addPossibleMoves([x - 1, y + 1]);
            }
            if(x - 1 >= 0 && y - 1 >= 0 && !this._checkColor(x-1, y-1, piece.color)){
                piece.addPossibleMoves([x - 1, y - 1]);
            }
            if(x + 1 < 8 && !this._checkColor(x+1, y, piece.color)){
                piece.addPossibleMoves([x + 1, y]);
            }
            if(x - 1 >= 0 && !this._checkColor(x-1, y, piece.color)){
                piece.addPossibleMoves([x - 1, y]);
            }
            if(y + 1 < 8 && !this._checkColor(x, y+1, piece.color)){
                piece.addPossibleMoves([x, y + 1]);
            }
            if(y - 1 >= 0 && !this._checkColor(x, y-1, piece.color)){
                piece.addPossibleMoves([x, y - 1]);
            }
        }

        this._updatePossibleMove = (color) => {
            this._chessPieces.forEach((line) => {
                line.forEach((piece) => {
                    if(piece.color === color){
                        if(piece.name === 'Pawn'){
                            this._pawn(piece);
                        }
                        else if(piece.name === 'Horse'){
                            this._horse(piece);
                        }
                        else if(piece.name === 'Bishop'){
                            this._bishop(piece);
                        }
                        else if(piece.name === 'Rook'){
                            this._rook(piece);
                        }
                        else if(piece.name === 'Queen'){
                            this._queen(piece);
                        }
                        else if(piece.name === 'King'){
                            this._king(piece);
                        }
                    }
                });
            });
        }

        this._updatePossibleMoveEnemy = (color) => {
            this._chessPieces.forEach((line) => {
                line.forEach((piece) => {
                    if(piece.color === color){
                        if(piece.name === 'Pawn'){
                            this._pawnEnemy(piece);
                        }
                        else if(piece.name === 'Horse'){
                            this._horseEnemy(piece);
                        }
                        else if(piece.name === 'Bishop'){
                            this._bishopEnemy(piece);
                        }
                        else if(piece.name === 'Rook'){
                            this._rookEnemy(piece);
                        }
                        else if(piece.name === 'Queen'){
                            this._queenEnemy(piece);
                        }
                        else if(piece.name === 'King'){
                            this._kingEnemy(piece);
                        }
                    }
                });
            });
        }
    }
    get updatePossibleMove(){
        return this._updatePossibleMove;
    }
    get checkmate(){
        return this._checkMate;
    }
}