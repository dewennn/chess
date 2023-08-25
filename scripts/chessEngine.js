export class ChessEngine{
    constructor(chessPieces, display){
        this._chessPieces = chessPieces;
        this._display = display;

        this._turn = "white";
        this._startPosition;
        this._picked = false;

        
    }
}