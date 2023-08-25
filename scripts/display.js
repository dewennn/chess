export class Display{
    constructor(chessPieces){
        this._chessPieces = chessPieces;

        this._clearPosition = () => {
            this._chessPieces.forEach((row) => {
                row.forEach((piece) => {
                    if(piece !== 0){
                        const [x, y] = piece.position;
                        document.querySelector(`.box${x}${y}`).innerHTML = '';
                    }
                })
            })
        }

        this._updateChessPosition = () => {
            this._clearPosition();
            this._chessPieces.forEach((row) => {
                row.forEach((piece) => {
                    if(piece !== 0){
                        const [x, y] = piece.position;
                        document.querySelector(`.box${x}${y}`).innerHTML = `<img class="piece" src="source/${piece.color}${piece.name}.png" alt="">`;
                    }
                })
            })
        };

        this._showPossibleMoves = (piece) => {
            piece.possibleMoves.forEach((position) => {
                const [x, y] = position;
                if(this._chessPieces[x][y] === 0){
                    document.querySelector(`.box${x}${y}`).innerHTML = '<img class = "possible" src="source/grayCircle.png" alt="">';
                }
                else{
                    document.querySelector(`.box${x}${y}`).innerHTML += '<img class = "target" src="source/target.png" alt="">';
                }
            });
        }

        this._clearPossibleMoves = (piece) => {
            piece.possibleMoves.forEach((position) => {
                const [x, y] = position;
                document.querySelector(`.box${x}${y}`).innerHTML = '';
            });
        }
    }
    get clearPosition(){
        return this._clearPosition;
    }
    get updateChessPosition(){
        return this._updateChessPosition;
    }
    get showPossibleMoves(){
        return this._showPossibleMoves;
    }
    get clearPossibleMoves(){
        return this._clearPossibleMoves;
    }
}