import { Pawn, Horse, Bishop, Rook, Queen, King } from './chessPieces.js';
import { ChessEngine } from './chessEngine.js';
import { Display } from './display.js';

export class ChessBoard{
    constructor(){

        if(localStorage.getItem('board')){
            this._chessPieces = [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0]
            ];

            JSON.parse(localStorage.getItem('board')).forEach((line) => {
                line.forEach((piece) => {
                    if(piece !== 0){
                        if(piece._name === 'King') this._chessPieces[piece._position[0]][piece._position[1]] = new King(`${piece._color}`, piece._position, piece._firstMove);
                        else if(piece._name === 'Queen') this._chessPieces[piece._position[0]][piece._position[1]] = new Queen(`${piece._color}`, piece._position);
                        else if(piece._name === 'Rook') this._chessPieces[piece._position[0]][piece._position[1]] = new Rook(`${piece._color}`, piece._position, piece._firstMove);
                        else if(piece._name === 'Bishop') this._chessPieces[piece._position[0]][piece._position[1]] = new Bishop(`${piece._color}`, piece._position);
                        else if(piece._name === 'Horse') this._chessPieces[piece._position[0]][piece._position[1]] = new Horse(`${piece._color}`, piece._position);
                        else if(piece._name === 'Pawn') this._chessPieces[piece._position[0]][piece._position[1]] = new Pawn(`${piece._color}`, piece._position, piece._firstMove, piece._enPassant);
                    }
                });
            });
        }
        else{
            this._chessPieces = [
                [new Rook('black', [0, 0], true), new Horse('black', [0, 1]), new Bishop('black', [0, 2]), new Queen('black', [0, 3]), new King('black', [0, 4], true), new Bishop('black', [0, 5]), new Horse('black', [0, 6]), new Rook('black', [0, 7], true)],
                [new Pawn('black', [1, 0], true, null), new Pawn('black', [1, 1], true, null), new Pawn('black', [1, 2], true, null), new Pawn('black', [1, 3], true, null), new Pawn('black', [1, 4], true, null), new Pawn('black', [1, 5], true, null), new Pawn('black', [1, 6], true, null), new Pawn('black', [1, 7], true, null)],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [new Pawn('white', [6, 0], true, null), new Pawn('white', [6, 1], true, null), new Pawn('white', [6, 2], true, null), new Pawn('white', [6, 3], true, null), new Pawn('white', [6, 4], true, null), new Pawn('white', [6, 5], true, null), new Pawn('white', [6, 6], true, null), new Pawn('white', [6, 7], true, null)],
                [new Rook('white', [7, 0], true), new Horse('white', [7, 1]), new Bishop('white', [7, 2]), new Queen('white', [7, 3]), new King('white', [7, 4], true), new Bishop('white', [7, 5]), new Horse('white', [7, 6]), new Rook('white', [7, 7], true)]
            ];
        }

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

        localStorage.setItem('board', JSON.stringify(this._chessPieces));

        document.querySelector(".restart").addEventListener('click', () => {
            localStorage.clear();
            location.reload();
        });
    }
}