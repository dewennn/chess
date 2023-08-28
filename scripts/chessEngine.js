import { Horse, Bishop, Rook, Queen} from './chessPieces.js';
import { PositionManager } from "./positionManager.js";

export class ChessEngine{
    constructor(chessPieces, display){
        
        this._game = localStorage.getItem('game') ? JSON.parse(localStorage.getItem('game')) : true;
        this._result = localStorage.getItem('result') ? String(localStorage.getItem('result')) : null;

        this._turn = localStorage.getItem('turn') ? String(localStorage.getItem('turn')) : 'white';
        
        if(this._game) document.querySelector('.turn').innerHTML = this._turn.toUpperCase();
        else document.querySelector('.turn').innerHTML = this._result.toUpperCase();

        if(localStorage.getItem('deadwhite')){
            document.querySelector(`.deadwhite`).innerHTML = String(localStorage.getItem('deadwhite'));
        }

        if(localStorage.getItem('deadblack')){
            document.querySelector(`.deadblack`).innerHTML = String(localStorage.getItem('deadblack'));
        }

        this._turnCtr = localStorage.getItem('turnCtr') ? JSON.parse(localStorage.getItem('turnCtr')) : [0];
        this._promotion = localStorage.getItem('promotion') ? JSON.parse(localStorage.getItem('promotion')) : false;
        
        if(this._promotion === true) document.querySelector(`.pick-${this._turn}`).classList.add('available');

        this._promotionCoord = localStorage.getItem('promotionCoord') ? JSON.parse(localStorage.getItem('promotionCoord')) : null;

        this._chessPieces = chessPieces;
        this._display = display;
        
        this._startPosition = null;
        this._picked = false;

        this._positionManager = new PositionManager(this._chessPieces, this._turnCtr);

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
                localStorage.setItem('result', `${enemy} WIN`);
                this._game = false;
            }
            else if(checker === 'stalemate'){
                document.querySelector('.turn').innerHTML = 'STALEMATE';
                localStorage.setItem('result', 'STALEMATE');
                this._game = false;
            }

            localStorage.setItem('board', JSON.stringify(this._chessPieces));
            localStorage.setItem('game', JSON.stringify(this._game));
            localStorage.setItem('promotion', JSON.stringify(this._promotion));
            localStorage.setItem('promotionCoord', JSON.stringify(this._promotionCoord));
            localStorage.setItem('turn', this._turn);
            localStorage.setItem('turnCtr', JSON.stringify(this._turnCtr));
        }

        this._pickPosition = (position) => {
            const [x, y] = [Number(position[0]), Number(position[1])];
            
            if(this._promotion === true){
                const forPromotion = this._turn === 'white' ? 8 : 9;
                if(x === forPromotion){
                    let upgrade;
                    if(y === 0){
                        upgrade = new Queen(this._turn, this._promotionCoord);
                    }
                    else if(y == 1){
                        upgrade = new Rook(this._turn, this._promotionCoord);
                    }
                    else if(y == 2){
                        upgrade = new Bishop(this._turn, this._promotionCoord);
                    }
                    else if(y == 3){
                        upgrade = new Horse(this._turn, this._promotionCoord);
                    }

                    this._chessPieces[this._promotionCoord[0]][this._promotionCoord[1]] = upgrade;
                    this._promotionCoord = null;
                    this._promotion = false;
                    document.querySelector(`.pick-${this._turn}`).classList.remove('available');

                    this._checkNReset();
                }
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
                    this._turnCtr[0]++;

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

                    if(pieceToMove.name === 'Pawn' && (this._startPosition[0]-x == 2 || this._startPosition[0]-x == -2)){
                        pieceToMove.enPassant = this._turnCtr[0];
                    }

                    if(pieceToMove.name === 'Pawn' && this._chessPieces[x][y] === 0 && this._startPosition[1] !== y){
                        if(pieceToMove.color === 'black'){
                            document.querySelector(`.dead${this._chessPieces[x-1][y].color}`).innerHTML += `<div><img src="source/${this._chessPieces[x-1][y].color}${this._chessPieces[x-1][y].name}.png" alt=""></div>`;
                            this._chessPieces[x-1][y] = 0;
                            localStorage.setItem(`dead${this._chessPieces[x][y].color}`, document.querySelector(`.dead${this._chessPieces[x][y].color}`).innerHTML);
                        }
                        else if(pieceToMove.color === 'white'){
                            document.querySelector(`.dead${this._chessPieces[x+1][y].color}`).innerHTML += `<div><img src="source/${this._chessPieces[x+1][y].color}${this._chessPieces[x+1][y].name}.png" alt=""></div>`;
                            this._chessPieces[x+1][y] = 0;
                            localStorage.setItem(`dead${this._chessPieces[x][y].color}`, document.querySelector(`.dead${this._chessPieces[x][y].color}`).innerHTML);
                        }
                    }
                    
                    if(this._chessPieces[x][y] !== 0){
                        document.querySelector(`.dead${this._chessPieces[x][y].color}`).innerHTML += `<div><img src="source/${this._chessPieces[x][y].color}${this._chessPieces[x][y].name}.png" alt=""></div>`;
                        localStorage.setItem(`dead${this._chessPieces[x][y].color}`, document.querySelector(`.dead${this._chessPieces[x][y].color}`).innerHTML);
                    }

                    this._chessPieces[x][y] = pieceToMove;
                    this._chessPieces[this._startPosition[0]][this._startPosition[1]] = 0;

                    if(pieceToMove.name === 'Pawn' && (pieceToMove.position[0] === 0 || pieceToMove.position[0] === 7)){
                        this._promotion = true;
                        this._promotionCoord = [x, y];

                        this._checkNReset();

                        this._changeTurn();
                        localStorage.setItem('turn', this._turn);
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