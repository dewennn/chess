export class PositionManager{
    constructor(chessPieces){
        this._chessPieces = chessPieces;
        this._checkEmpty = (x, y) => {
            return this._chessPieces[x][y] === 0 ? true : false;
        }
        this._checkColor = (x, y, color) => {
            if(color === 'black'){
                if(this._chessPieces[x][y].color === 'black'){
                    return false;
                }
                else{
                    return true;
                }
            }
            else if(color === 'white'){
                if(this._chessPieces[x][y].color === 'white'){
                    return false;
                }
                else{
                    return true;
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
            this._updatePossibleMove(enemy);

            chessPieces.forEach((row) => {
                row.forEach((piece) => {
                    if(piece !== 0 && piece.color === enemy){
                        piece.possibleMoves.forEach((move) => {
                            if(move[0] === king.position[0] && move[1] === king.position[1]){
                                return true;
                            }
                        });
                    }
                });
            });

            return false;
        }

        this._pawn = (piece) => {
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

        this._updatePossibleMove = (color) => {
            this._chessPieces.forEach((line) => {
                line.forEach((piece) => {
                    if(piece.color === color){
                        
                    }
                });
            });
        }
    }
}