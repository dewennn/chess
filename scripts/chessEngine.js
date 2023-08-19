import { Map } from "./maps.js";

export class chessEngine{
    static map = new Map();

    static startPosition;
    static picked = false;

    static applyFunctionality(chessPieces, updatePosition, clearPosition){
        document.querySelectorAll(".box").forEach((box) => {
            box.addEventListener('click', () => {
                chessEngine.pickPosition(box.dataset.position, chessPieces, clearPosition);
                updatePosition();
            });
        });
    }

    static pickPosition(position, chessPieces, clearPosition){
        const [x, y] = [Number(position[0]), Number(position[1])];

        if(chessEngine.picked == false && chessEngine.map.checkEmpty(x, y)){
            chessEngine.startPosition = [x, y];
            chessEngine.picked = true;
        }
        else if(chessEngine.picked == true){
            clearPosition();
            chessPieces.forEach((piece) => {
                if(piece.position[0] === chessEngine.startPosition[0] && piece.position[1] === chessEngine.startPosition[1]){
                    piece.position = [x, y];
                }
            });
            chessEngine.map.updatePositionMap(chessPieces);
            console.log(chessEngine.map);
            console.log(chessPieces);
            chessEngine.resetPick();
        }
    }

    static resetPick(){
        chessEngine.startPosition = null;
        chessEngine.picked = false;
    }

}