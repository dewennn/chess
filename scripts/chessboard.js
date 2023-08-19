import { setupChessboard } from './setup.js';
import { chessEngine } from './chessEngine.js';

class Chessboard{
    constructor(){
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
        chessEngine.applyFunctionality(this._chessPieces, this._updateChessPosition, this._clearPosition);
    }
    get updateChessPosition(){
        return this._updateChessPosition();
    }
}

const chessboard = new Chessboard();