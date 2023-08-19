import { Map } from "./maps.js";

export class ChessEngine{
    constructor(){
        this._startPosition;
        this._picked = false;

        this._resetpick = () => {
            this._startPosition = null;
            this._picked = false;
        }

        this._pickPosition = (position, chessPieces, clearPosition) => {
            const [x, y] = [Number(position[0]), Number(position[1])];
    
            if(this._picked == false && Map.checkEmpty(x, y)){
                document.querySelector(`.box${x}${y}`).classList.add('selected');
                this._startPosition = [x, y];
                this._picked = true;
            }
            else if(this._picked == true){
                document.querySelector(`.box${this._startPosition[0]}${this._startPosition[1]}`).classList.remove('selected');
                clearPosition();
                chessPieces.forEach((piece) => {
                    if(piece.position[0] === this._startPosition[0] && piece.position[1] === this._startPosition[1]){
                        piece.position = [x, y];
                    }
                });
                Map.updatePositionMap(chessPieces);
                this._resetpick();
            }
        }

        this._applyFunctionality = (chessPieces, updatePosition, clearPosition) => {
            document.querySelectorAll(".box").forEach((box) => {
                box.addEventListener('click', () => {
                    this._pickPosition(box.dataset.position, chessPieces, clearPosition);
                    updatePosition();
                });
            });
        }
    }
    get applyFunctionality(){
        return this._applyFunctionality;
    }
}