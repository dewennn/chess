export class ChessPiece{
    constructor(color, position){
        this._name
        this._color = color;
        this._position = position;
        this._possibleMoves = [];

        this._addPossibleMoves = (position) => {
            this._possibleMoves.push(position);
        }
        this._clearPossibleMoves = () => {
            this._possibleMoves = [];
        }
    }
    get name(){
        return this._name;
    }
    get color(){
        return this._color;
    }
    set position(value){
        this._position = value;
    }
    get position(){
        return this._position;
    }
    get possibleMoves(){
        return this._possibleMoves;
    }
    get addPossibleMoves(){
        return this._addPossibleMoves;
    }
    get clearPossibleMoves(){
        return this._clearPossibleMoves;
    }
}

export class Pawn extends ChessPiece{
    constructor(color, position, firstMove, enPassant){
        super(color, position);
        this._name = 'Pawn';
        this._firstMove = firstMove;
        this._enPassant = enPassant;
    }
    set enPassant(value){
        this._enPassant = value;
    }
    get enPassant(){
        return this._enPassant;
    }
    get firstMove(){
        return this._firstMove;
    }
    get firstMoveFalse(){
        return () => {
            this._firstMove = false;
        }
    }
}

export class Horse extends ChessPiece{
    constructor(color, position){
        super(color, position);
        this._name = 'Horse';
    }
}

export class Bishop extends ChessPiece{
    constructor(color, position){
        super(color, position);
        this._name = 'Bishop';
    }
}

export class Rook extends ChessPiece{
    constructor(color, position, firstMove){
        super(color, position);
        this._name = 'Rook';
        this._firstMove = firstMove;
    }
    get firstMove(){
        return this._firstMove;
    }
    get firstMoveFalse(){
        return () => {
            this._firstMove = false;
        }
    }
}

export class Queen extends ChessPiece{
    constructor(color, position){
        super(color, position);
        this._name = 'Queen';
    }
}

export class King extends ChessPiece{
    constructor(color, position, firstMove){
        super(color, position);
        this._name = 'King';
        this._firstMove = firstMove;
    }
    get firstMove(){
        return this._firstMove;
    }
    get firstMoveFalse(){
        return () => {
            this._firstMove = false;
        }
    }
}