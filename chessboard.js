import {Pawn, Horse, Bishop, Rook, Queen, King} from './chessPieces.js'

class Chessboard{
    constructor(){
        this._chessPieces = [];
        
        // Pawns
        for(let i = 0; i < 8; i++){
            this._chessPieces.push(new Pawn('black', [1, i]));
            this._chessPieces.push(new Pawn('white', [6, i]));
        }

        // Horses
        this._chessPieces.push(new Horse('black', [0, 1]));
        this._chessPieces.push(new Horse('black', [0, 6]));
        this._chessPieces.push(new Horse('white', [7, 1]));
        this._chessPieces.push(new Horse('white', [7, 6]));

        // Bishops
        this._chessPieces.push(new Bishop('black', [0, 2]));
        this._chessPieces.push(new Bishop('black', [0, 5]));
        this._chessPieces.push(new Bishop('white', [7, 2]));
        this._chessPieces.push(new Bishop('white', [7, 5]));

        // Rooks
        this._chessPieces.push(new Rook('black', [0, 0]));
        this._chessPieces.push(new Rook('black', [0, 7]));
        this._chessPieces.push(new Rook('white', [7, 0]));
        this._chessPieces.push(new Rook('white', [7, 7]));

        // Kings and Queens
        this._chessPieces.push(new Queen('black', [0, 3]));
        this._chessPieces.push(new Queen('white', [7, 3]));
        this._chessPieces.push(new King('black', [0, 4]));
        this._chessPieces.push(new King('white', [7, 4]));

        this._setChessPieces = () => {
            this._chessPieces.forEach((piece) => {
                const [i, j] = piece.position;
                document.querySelector(`.box${i}${j}`).innerHTML = `<img src="source/${piece.color}${piece.constructor.name}.png" alt="">`;
            })
        };

        this._displayChessboard = () => {
            let html = '';
            let ctr = 0;

            for(let i = 0; i < 8; i++){
                ctr = i % 2 ? 0 : 1;
                for(let j = 0; j < 8; j++){
                    if(ctr % 2 == 0){
                        html += `<div class="white box${i}${j}"></div>`;
                    }
                    else{
                        html += `<div class="black box${i}${j}"></div>`
                    }
                    ctr++;
                }
            }
        
            document.querySelector('.chessboard').innerHTML = html;
            this._setChessPieces();
        }
    }
    get displayChessboard(){
        return this._displayChessboard;
    }
}

const chessboard = new Chessboard();
chessboard.displayChessboard();