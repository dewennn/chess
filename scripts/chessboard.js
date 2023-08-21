import { setupChessboard, setChessboardBase } from './setup.js';
import { ChessEngine } from './chessEngine.js';

class Chessboard{
    constructor(){
        this._engine = new ChessEngine();
        this._chessPieces = setupChessboard();
        setChessboardBase();

        this._clearPosition = () => {
            this._chessPieces.forEach((row) => {
                row.forEach((piece) => {
                    if(piece !== 0){
                        const [x, y] = piece.position;
                        document.querySelector(`.box${x}${y}`).innerHTML = '';
                    }
                })
            })
        }

        this._updateChessPosition = () => {
            this._clearPosition();
            this._chessPieces.forEach((row) => {
                row.forEach((piece) => {
                    if(piece !== 0){
                        const [x, y] = piece.position;
                        document.querySelector(`.box${x}${y}`).innerHTML = `<img class="piece" src="source/${piece.color}${piece.constructor.name}.png" alt="">`;
                    }
                })
            })
        };

        this._updateChessPosition();
        this._engine.applyFunctionality(this._chessPieces, this._updateChessPosition, this._clearPosition);
    }
}

const chessboard = new Chessboard();