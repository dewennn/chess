export class chessEngine{
    static startPosition;
    static picked = false;

    static applyFunctionality(chessPieces, updatePosition){
        document.querySelectorAll(".box").forEach((box) => {
            box.addEventListener('click', () => {
                chessEngine.pickPosition(box.dataset.position, chessPieces);
                updatePosition;
            });
        });
    }

    static pickPosition(position, chessPieces){
        if(chessEngine.picked == false){
            console.log(position);
            chessEngine.picked = true;
        }
        else{
            console.log(position);
            chessEngine.picked = false;
        }
    }

    static resetPick(){
        chessEngine.startPosition = null;
        chessEngine.picked = false;
    }

}