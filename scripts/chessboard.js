import { Pawn, Horse, Bishop, Rook, Queen, King } from './chessPieces.js';
import { ChessEngine } from './chessEngine.js';
import { Display } from './display.js';

export class ChessBoard{
    constructor(){
        this._chessPieces = [
            [new Rook('black', [0, 0]), new Horse('black', [0, 1]), new Bishop('black', [0, 2]), new Queen('black', [0, 3]), new King('black', [0, 4]), new Bishop('black', [0, 5]), new Horse('black', [0, 6]), new Rook('black', [0, 7])],
            [new Pawn('black', [1, 0]), new Pawn('black', [1, 1]), new Pawn('black', [1, 2]), new Pawn('black', [1, 3]), new Pawn('black', [1, 4]), new Pawn('black', [1, 5]), new Pawn('black', [1, 6]), new Pawn('black', [1, 7])],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [new Pawn('white', [6, 0]), new Pawn('white', [6, 1]), new Pawn('white', [6, 2]), new Pawn('white', [6, 3]), new Pawn('white', [6, 4]), new Pawn('white', [6, 5]), new Pawn('white', [6, 6]), new Pawn('white', [6, 7])],
            [new Rook('white', [7, 0]), new Horse('white', [7, 1]), new Bishop('white', [7, 2]), new Queen('white', [7, 3]), new King('white', [7, 4]), new Bishop('white', [7, 5]), new Horse('white', [7, 6]), new Rook('white', [7, 7])]
        ];

        this._display = new Display(this._chessPieces);
        this._engine = new ChessEngine(this._chessPieces, this._display);

        this._setChessboardBase = () => {
            let html = '';
            let ctr = 0;
        
            for(let i = 0; i < 8; i++){
                ctr = i % 2 ? 0 : 1;
                for(let j = 0; j < 8; j++){
                    if(ctr % 2 == 0){
                        html += `<div class="box white box${i}${j}" data-position = "${i}${j}"></div>`;
                    }
                    else{
                        html += `<div class="box black box${i}${j}" data-position = "${i}${j}"></div>`
                    }
                    ctr++;
                }
            }
        
            document.querySelector('.chessboard').innerHTML = html;
        }

        this._setChessboardBase();
        this._display.clearPosition();
        this._display.updateChessPosition();
        this._engine.run;
    }
}