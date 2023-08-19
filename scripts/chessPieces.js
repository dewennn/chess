class ChessPiece{
    constructor(color, position){
        this._color = color;
        this._position = position;
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
}

export class Pawn extends ChessPiece{
    constructor(color, position){
        super(color, position)
    }
}

export class Horse extends ChessPiece{
    constructor(color, position){
        super(color, position)
    }
}

export class Bishop extends ChessPiece{
    constructor(color, position){
        super(color, position)
    }
}

export class Rook extends ChessPiece{
    constructor(color, position){
        super(color, position)
    }
}

export class Queen extends ChessPiece{
    constructor(color, position){
        super(color, position)
    }
}

export class King extends ChessPiece{
    constructor(color, position){
        super(color, position)
    }
}