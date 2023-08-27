import { Horse, Bishop, Rook, Queen} from './chessPieces.js';
import { PositionManager } from "./positionManager.js";

export class ChessEngine{
    constructor(chessPieces, display){
        this._game = true;
        this._promotion = false;
        this._promotionCoord;

        this._chessPieces = chessPieces;
        this._display = display;
        this._positionManager = new PositionManager(this._chessPieces);

        this._turn = "white";
        this._startPosition;
        this._picked = false;

        this._resetpick = () => {
            this._startPosition = null;
            this._picked = false;
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

        this._pickThis = (position) => {
            const [x, y] = position;
            this._resetpick();
            document.querySelector(`.box${x}${y}`).classList.add('selected');

            this._positionManager.updatePossibleMove(this._turn);

            this._display.showPossibleMoves(this._chessPieces[x][y]);
            this._startPosition = [x, y];
            this._picked = true;
        }

        this._resetChoice = () => {
            if(this._picked === true){
                document.querySelector(`.box${this._startPosition[0]}${this._startPosition[1]}`).classList.remove('selected');
                this._display.clearPossibleMoves(this._chessPieces[this._startPosition[0]][this._startPosition[1]]);
                this._resetpick();
            }
        }

        this._checkNReset = () => {
            this._resetpick();
            this._changeTurn();

            this._display.updateChessPosition();

            this._positionManager.checkmate(this._turn);
            const checker = this._positionManager.checkmate(this._turn);

            if(checker === 'checkmate'){
                const enemy = this._turn === 'white' ? 'BLACK' : 'WHITE'; 
                document.querySelector('.turn').innerHTML = `${enemy} WIN`;
                this._game = false;
            }
            else if(checker === 'stalemate'){
                document.querySelector('.turn').innerHTML = 'STALEMATE';
                this._game = false;
            }
        }

        this._pickPosition = (position) => {
            const [x, y] = [Number(position[0]), Number(position[1])];
            
            if(this._promotion === true){
                let upgrade;
                if(x === 8 && y === 0){
                    upgrade = new Queen(this._turn, this._promotionCoord);
                }
                else if(x == 8 && y == 1){
                    upgrade = new Rook(this._turn, this._promotionCoord);
                }
                else if(x == 8 && y == 2){
                    upgrade = new Bishop(this._turn, this._promotionCoord);
                }
                else if(x == 8 && y == 3){
                    upgrade = new Horse(this._turn, this._promotionCoord);
                }

                this._chessPieces[this._promotionCoord[0]][this._promotionCoord[1]] = upgrade;
                this._promotionCoord = null;
                this._promotion = false;
                document.querySelector(`.pick-${this._turn}`).classList.remove('available');

                this._checkNReset();
            }
            else if(this._picked == false && this._chessPieces[x][y] !== 0 && this._chessPieces[x][y].color === this._turn && this._game === true && this._promotion === false){
                this._pickThis([x, y]);
            }
            else if(this._picked == true && chessPieces[x][y] !== 0 && chessPieces[x][y].color === this._turn && this._game === true && this._promotion === false){
                this._resetChoice();
                display.updateChessPosition();
                this._pickThis([x, y]);
            }
            else if(this._picked == true && this._game === true && this._promotion === false){
                let validMove = false;
                const pieceToMove = this._chessPieces[this._startPosition[0]][this._startPosition[1]];

                pieceToMove.possibleMoves.forEach((position) => {
                    if(position[0] === x & position[1] === y) validMove = true;
                });

                if(validMove === true){
                    document.querySelector(`.box${this._startPosition[0]}${this._startPosition[1]}`).classList.remove('selected');
                    this._display.clearPossibleMoves(pieceToMove);
                    this._display.clearPosition();

                    pieceToMove.position = [x, y];
                    if(pieceToMove.name === 'Pawn' || pieceToMove.name === 'King' || pieceToMove.name === 'Rook'){
                        if(pieceToMove.color === 'black' && pieceToMove.name === 'King'){
                            if(y === 2){
                                this._chessPieces[0][3] = this._chessPieces[0][0];
                                this._chessPieces[0][0] = 0;
                                this._chessPieces[0][3].position = [0, 3];
                                this._chessPieces[0][3].firstMoveFalse();
                            }
                            else if(y === 6){
                                this._chessPieces[0][5] = this._chessPieces[0][7];
                                this._chessPieces[0][7] = 0;
                                this._chessPieces[0][5].position = [0, 5];
                                this._chessPieces[0][5].firstMoveFalse();
                            }
                        }
                        else if(pieceToMove.color === 'white' && pieceToMove.name === 'King'){
                            if(y === 2){
                                this._chessPieces[7][3] = this._chessPieces[7][0];
                                this._chessPieces[7][0] = 0;
                                this._chessPieces[7][3].position = [7, 3];
                                this._chessPieces[7][3].firstMoveFalse();
                            }
                            else if(y === 6){
                                this._chessPieces[7][5] = this._chessPieces[7][7];
                                this._chessPieces[7][7] = 0;
                                this._chessPieces[7][5].position = [7, 5];
                                this._chessPieces[7][5].firstMoveFalse();
                            }
                        }

                        pieceToMove.firstMoveFalse();
                    }
                    
                    this._chessPieces[x][y] = this._chessPieces[this._startPosition[0]][this._startPosition[1]];
                    this._chessPieces[this._startPosition[0]][this._startPosition[1]] = 0;

                    if(pieceToMove.name === 'Pawn' && (pieceToMove.position[0] === 0 || pieceToMove.position[0] === 7)){
                        this._promotion = true;
                        this._promotionCoord = [x, y];

                        this._checkNReset();

                        this._changeTurn();
                        document.querySelector(`.pick-${this._turn}`).classList.add('available');
                    }
                    else{
                        this._checkNReset();
                    }
                }
            }
        }

        this._applyFunctionality = () => {
            document.querySelectorAll(".box").forEach((box) => {
                box.addEventListener('click', () => {
                    this._pickPosition(box.dataset.position);
                });
            });
            document.querySelectorAll(".gray").forEach((gray) => {
                gray.addEventListener('click', () => {
                    this._pickPosition(gray.dataset.position);
                });
            });
        }
    }
    get run(){
        return this._applyFunctionality();
    }
}