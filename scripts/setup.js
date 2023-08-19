import { Pawn, Horse, Bishop, Rook, Queen, King } from './chessPieces.js'

const setChessboardBase = () => {
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

export const setupChessboard = (chessPieces) => {
    // Pawns
    for(let i = 0; i < 8; i++){
        chessPieces.push(new Pawn('black', [1, i]));
        chessPieces.push(new Pawn('white', [6, i]));
    }

    // Horses
    chessPieces.push(new Horse('black', [0, 1]));
    chessPieces.push(new Horse('black', [0, 6]));
    chessPieces.push(new Horse('white', [7, 1]));
    chessPieces.push(new Horse('white', [7, 6]));

    // Bishops
    chessPieces.push(new Bishop('black', [0, 2]));
    chessPieces.push(new Bishop('black', [0, 5]));
    chessPieces.push(new Bishop('white', [7, 2]));
    chessPieces.push(new Bishop('white', [7, 5]));

    // Rooks
    chessPieces.push(new Rook('black', [0, 0]));
    chessPieces.push(new Rook('black', [0, 7]));
    chessPieces.push(new Rook('white', [7, 0]));
    chessPieces.push(new Rook('white', [7, 7]));

    // Kings and Queens
    chessPieces.push(new Queen('black', [0, 3]));
    chessPieces.push(new Queen('white', [7, 3]));
    chessPieces.push(new King('black', [0, 4]));
    chessPieces.push(new King('white', [7, 4]));

    setChessboardBase();
}