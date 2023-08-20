import { Map } from "./map.js";

export class ChessEngine{
    constructor(){
        this._turn = "white";
        this._startPosition;
        this._picked = false;

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
            this._showPossibleMoves(chessPieces[x][y]);
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

        this._showPossibleMoves = (piece) => {
            piece.generatePossibleMoves();
            piece.possibleMoves.forEach((position) => {
                const [x, y] = position;
                document.querySelector(`.box${x}${y}`).innerHTML = '<img src="source/grayCircle.png" alt="">';
            });
        }

        this._clearPossibleMoves = (piece) => {
            piece.generatePossibleMoves();
            piece.possibleMoves.forEach((position) => {
                const [x, y] = position;
                document.querySelector(`.box${x}${y}`).innerHTML = '';
            });
        }

        this._resetpick = () => {
            this._startPosition = null;
            this._picked = false;
        }

        this._pickPosition = (position, chessPieces, clearPosition) => {
            const [x, y] = [Number(position[0]), Number(position[1])];
            
            
            if(this._turn === 'white'){
                if(this._picked == false && chessPieces[x][y] !== 0){
                    this._pickThis([x, y], chessPieces);
                }
                else if(this._picked == true && chessPieces[x][y] !== 0){
                    this._resetChoice(chessPieces);
                    this._pickThis([x, y], chessPieces);
                }
                else if(this._picked == true){
                    let validMove = false;
                    const pieceToMove = chessPieces[this._startPosition[0]][this._startPosition[1]];

                    pieceToMove.possibleMoves.forEach((position) => {
                        if(position[0] === x & position[1] === y) validMove = true;
                    });
    
                    if(validMove === true){
                        document.querySelector(`.box${this._startPosition[0]}${this._startPosition[1]}`).classList.remove('selected');
                        clearPosition();
                        this._clearPossibleMoves(pieceToMove);
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
                    }
                }
            }
            else if(this._turn === 'black'){
                if(this._picked == false && chessPieces[x][y] !== 0){
                    this._pickThis([x, y], chessPieces);
                }
                else if(this._picked == true && chessPieces[x][y] !== 0){
                    this._resetChoice(chessPieces);
                    this._pickThis([x, y], chessPieces);
                }
                else if(this._picked == true){
                    let validMove = false;
                    const pieceToMove = chessPieces[this._startPosition[0]][this._startPosition[1]];

                    pieceToMove.possibleMoves.forEach((position) => {
                        if(position[0] === x & position[1] === y) validMove = true;
                    });
    
                    if(validMove === true){
                        document.querySelector(`.box${this._startPosition[0]}${this._startPosition[1]}`).classList.remove('selected');
                        clearPosition();
                        this._clearPossibleMoves(pieceToMove);
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
                    }
                }
            }
        }

        this._applyFunctionality = (chessPieces, updatePosition, clearPosition) => {
            document.querySelectorAll(".box").forEach((box) => {
                box.addEventListener('click', () => {
                    this._pickPosition(box.dataset.position, chessPieces, clearPosition);
                    updatePosition();
                    console.log(chessPieces, Map.positionMap);
                });
            });

        }
    }
    get applyFunctionality(){
        return this._applyFunctionality;
    }
}