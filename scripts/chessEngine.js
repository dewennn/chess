export class ChessEngine{
    constructor(chessPieces, display){
        this._chessPieces = chessPieces;
        this._display = display;

        this._turn = "white";
        this._startPosition;
        this._picked = false;

        this._resetpick = () => {
            this._startPosition = null;
            this._picked = false;
        }

        this._changeTurn = () => {
            if(this._turn === 'white'){
                this._turn = 'black';
                document.querySelector('.turn').innerHTML = 'BLACK';
            }
            else if(this._turn === 'black'){
                this._turn = 'white';
                document.querySelector('.turn').innerHTML = 'WHITE';
            }
        }

        this._pickThis = (position) => {
            const [x, y] = position;
            this._resetpick();
            document.querySelector(`.box${x}${y}`).classList.add('selected');
            this._display.showPossibleMoves(this._chessPieces[x][y]);
            this._startPosition = [x, y];
            this._picked = true;
        }

        this._resetChoice = (chessPieces) => {
            if(this._picked === true){
                document.querySelector(`.box${this._startPosition[0]}${this._startPosition[1]}`).classList.remove('selected');
                this._display.clearPossibleMoves(chessPieces[this._startPosition[0]][this._startPosition[1]]);
                this._resetpick();
            }
        }

        this._pickPosition = (position) => {
            const [x, y] = [Number(position[0]), Number(position[1])];
            
            if(this._picked == false && this._chessPieces[x][y] !== 0 && this._chessPieces[x][y].color === this._turn){
                this._pickThis([x, y]);
            }
            else if(this._picked == true && chessPieces[x][y] !== 0 && chessPieces[x][y].color === this._turn){
                this._resetChoice(chessPieces);
                this._pickThis([x, y]);
            }
            else if(this._picked == true){
                let validMove = false;
                const pieceToMove = this._chessPieces[this._startPosition[0]][this._startPosition[1]];

                pieceToMove.possibleMoves.forEach((position) => {
                    if(position[0] === x & position[1] === y) validMove = true;
                });

                if(validMove === true){
                    if(chessPieces[x][y] !== 0){
                        chessPieces[x][y] = 0;
                    }

                    document.querySelector(`.box${this._startPosition[0]}${this._startPosition[1]}`).classList.remove('selected');
                    this._display.clearPossibleMoves(pieceToMove);
                    this._display.clearPosition();

                    pieceToMove.position = [x, y];
                    
                    const temp = this._chessPieces[this._startPosition[0]][this._startPosition[1]];
                    this._chessPieces[this._startPosition[0]][this._startPosition[1]] = this._chessPieces[x][y];
                    this._chessPieces[x][y] = temp;

                    this._resetpick();
                    this._changeTurn();

                    this._display.updateChessPosition();
                }
            }
        }

        this._applyFunctionality = () => {
            document.querySelectorAll(".box").forEach((box) => {
                box.addEventListener('click', () => {
                    this._pickPosition(box.dataset.position);
                });
            });
        }
    }
    get run(){
        return this._applyFunctionality();
    }
}