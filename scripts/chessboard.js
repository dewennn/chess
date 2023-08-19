import { setupChessboard } from './setup.js';
import { ChessEngine } from './chessEngine.js';

class Chessboard{
    constructor(){
        this._engine = new ChessEngine();
        this._chessPieces = [];
        
        setupChessboard(this._chessPieces);

        this._clearPosition = () => {
            this._chessPieces.forEach((piece) => {
                const [i, j] = piece.position;
                document.querySelector(`.box${i}${j}`).innerHTML = '';
            })
        }

        this._updateChessPosition = () => {
            this._clearPosition();
            this._chessPieces.forEach((piece) => {
                const [i, j] = piece.position;
                document.querySelector(`.box${i}${j}`).innerHTML = `<img src="source/${piece.color}${piece.constructor.name}.png" alt="">`;
            })
        };

        this._updateChessPosition();
        this._engine.applyFunctionality(this._chessPieces, this._updateChessPosition, this._clearPosition);
    }
}

const chessboard = new Chessboard();