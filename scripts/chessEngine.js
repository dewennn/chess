import { Map } from "./map.js";

export class ChessEngine{
    constructor(){
        this._turn = "white";
        this._startPosition;
        this._picked = false;

        this._updatePossibleMove = (chessPieces) => {
            chessPieces.forEach((row) => {
                row.forEach((piece) => {
                    if(piece !== 0){
                        piece.generatePossibleMoves();
                    }
                });
            });
        }

        this._kingInDanger = (chessPieces) => {
            let danger = false;
            let king;
            chessPieces.forEach((row) => {
                row.forEach((piece) => {
                    if(piece !== 0){
                        if(piece.constructor.name === 'King' && piece.color === this._turn){
                            king = piece;
                        }
                    }
                });
            });

            this._updatePossibleMove(chessPieces);

            chessPieces.forEach((row) => {
                row.forEach((piece) => {
                    if(piece !== 0){
                        piece.possibleMoves.forEach((move) => {
                            if(move[0] === king.position[0] && move[1] === king.position[1]) danger = true;
                        });
                    }
                });
            });

            console.log(danger);
            Map.kingInDanger = danger;
        }

        this._changeTurn = () => {
            if(this._turn === 'white'){
                this._turn = 'black';
                document.querySelector('.turn').innerHTML = 'BLACK';
            }
            else if(this._turn === 'black'){
                this._turn = 'white';
                document.querySelector('.turn').innerHTML = 'WHITE';
            }
        }

        this._pickThis = (position, chessPieces) => {
            const [x, y] = position;
            this._resetpick();
            document.querySelector(`.box${x}${y}`).classList.add('selected');

            Map.positionMap[x][y] = 0;
            this._kingInDanger(chessPieces);
            if(Map.kingInDanger){
                chessPieces[x][y].cantMove();
            }
            Map.positionMap[x][y] = this._turn === 'black' ? 2 : 1;

            this._showPossibleMoves(chessPieces[x][y], chessPieces);
            this._startPosition = [x, y];
            this._picked = true;
        }

        this._resetChoice = (chessPieces) => {
            if(this._picked === true){
                document.querySelector(`.box${this._startPosition[0]}${this._startPosition[1]}`).classList.remove('selected');
                this._clearPossibleMoves(chessPieces[this._startPosition[0]][this._startPosition[1]]);
                this._resetpick();
            }
        }

        this._showPossibleMoves = (piece, chessPieces) => {
            piece.possibleMoves.forEach((position) => {
                const [x, y] = position;
                if(chessPieces[x][y] === 0){
                    document.querySelector(`.box${x}${y}`).innerHTML = '<img class = "possible" src="source/grayCircle.png" alt="">';
                }
                else{
                    document.querySelector(`.box${x}${y}`).innerHTML += '<img class = "target" src="source/target.png" alt="">';
                }
            });
        }

        this._clearPossibleMoves = (piece) => {
            piece.possibleMoves.forEach((position) => {
                const [x, y] = position;
                document.querySelector(`.box${x}${y}`).innerHTML = '';
            });
        }

        this._resetpick = () => {
            this._startPosition = null;
            this._picked = false;
        }

        this._pickPosition = (position, chessPieces, clearPosition, updatePosition) => {
            const [x, y] = [Number(position[0]), Number(position[1])];
            
            if(this._picked == false && chessPieces[x][y] !== 0 && chessPieces[x][y].color === this._turn){
                this._pickThis([x, y], chessPieces);
            }
            else if(this._picked == true && chessPieces[x][y] !== 0 && chessPieces[x][y].color === this._turn){
                this._resetChoice(chessPieces);
                updatePosition();
                this._pickThis([x, y], chessPieces);
            }
            else if(this._picked == true){
                let validMove = false;
                const pieceToMove = chessPieces[this._startPosition[0]][this._startPosition[1]];

                pieceToMove.possibleMoves.forEach((position) => {
                    if(position[0] === x & position[1] === y) validMove = true;
                });

                if(validMove === true){
                    if(chessPieces[x][y] !== 0){
                        chessPieces[x][y] = 0;
                    }
                    document.querySelector(`.box${this._startPosition[0]}${this._startPosition[1]}`).classList.remove('selected');
                    this._clearPossibleMoves(pieceToMove);
                    clearPosition();
                    pieceToMove.position = [x, y];
                    if(pieceToMove.constructor.name === 'Pawn'){
                        pieceToMove.firstMoveFalse();
                    }
                    const temp = chessPieces[this._startPosition[0]][this._startPosition[1]];
                    chessPieces[this._startPosition[0]][this._startPosition[1]] = chessPieces[x][y];
                    chessPieces[x][y] = temp;
                    Map.updatePositionMap(chessPieces);
                    this._resetpick();
                    this._changeTurn();
                    updatePosition();
                    this._updatePossibleMove(chessPieces);
                    this._kingInDanger(chessPieces);
                }
            }
        }

        this._applyFunctionality = (chessPieces, updatePosition, clearPosition) => {
            document.querySelectorAll(".box").forEach((box) => {
                box.addEventListener('click', () => {
                    this._pickPosition(box.dataset.position, chessPieces, clearPosition, updatePosition);
                });
            });

        }
    }
    get updatePossibleMove(){
        return this._updatePossibleMove;
    }

    get applyFunctionality(){
        return this._applyFunctionality;
    }
}