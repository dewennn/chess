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
        super(color, position);
        this._firstMove = true;
        this._possibleMoves = [];

        this._generatePossibleMoves = (position) => {
            this._possibleMoves = [];
            const [x, y] = position;
            if(this._firstMove === true){
                this._possibleMoves.push([x + 1, y + 1]);
                this._possibleMoves.push([x + 2, y + 2]);
                this._firstMove = false;
            }
            else{
                this._possibleMoves.push([x++, y++]);
            }
        }

        this._generatePossibleMoves(position);
    }
    get generatePossibleMoves(){
        return this._generatePossibleMoves;
    }
}

export class Horse extends ChessPiece{
    constructor(color, position){
        super(color, position);
        this._possibleMoves = [];

        this._generatePossibleMoves = (position) => {
            this._possibleMoves = [];
            const [x, y] = position;

            if(x + 2 < 8 && y + 1 < 8){
                this._possibleMoves.push([x + 2, y + 1]);
            }
            if(x + 2 < 8 && y - 1 >= 0){
                this._possibleMoves.push([x + 2, y - 1]);
            }
            if(x + 1 < 8 && y + 2 < 8){
                this._possibleMoves.push([x + 1, y + 2]);
            }
            if(x + 1 < 8 && y - 2 >= 0){
                this._possibleMoves.push([x + 1, y - 2]);
            }
            if(x - 2 >= 0 && y + 1 < 8){
                this._possibleMoves.push([x - 2, y + 1]);
            }
            if(x - 2 >= 0 && y - 1 >= 0){
                this._possibleMoves.push([x - 2, y - 1]);
            }
            if(x - 1 >= 0 && y + 2 < 8){
                this._possibleMoves.push([x - 1, y + 2]);
            }
            if(x - 1 >= 0 && y - 2 >= 0){
                this._possibleMoves.push([x - 1, y - 2]);
            }
        }

        this._generatePossibleMoves(position);
    }
    get generatePossibleMoves(){
        return this._generatePossibleMoves;
    }
}

export class Bishop extends ChessPiece{
    constructor(color, position){
        super(color, position);
        this._possibleMoves = [];

        this._generatePossibleMoves = (position) => {
            this._possibleMoves = [];
            const [x, y] = position;

            let xTemp = x, yTemp = y;

            while(xTemp < 8 && yTemp < 8){
                xTemp++;
                yTemp++;
                this._possibleMoves.push([xTemp, yTemp]);
            }

            xTemp = x, yTemp = y;

            while(xTemp < 8 && yTemp >= 0){
                xTemp++;
                yTemp--;
                this._possibleMoves.push([xTemp, yTemp]);
            }

            xTemp = x, yTemp = y;

            while(xTemp >= 0 && yTemp < 8){
                xTemp--;
                yTemp++;
                this._possibleMoves.push([xTemp, yTemp]);
            }

            xTemp = x, yTemp = y;

            while(xTemp >= 0 && yTemp >= 0){
                xTemp--;
                yTemp--;
                this._possibleMoves.push([xTemp, yTemp]);
            }
        }

        this._generatePossibleMoves(position);
    }
    get generatePossibleMoves(){
        return this._generatePossibleMoves;
    }
}

export class Rook extends ChessPiece{
    constructor(color, position){
        super(color, position);
        this._possibleMoves = [];

        this._generatePossibleMoves = (position) => {
            this._possibleMoves = [];
            const [x, y] = position;

            let xTemp = x, yTemp = y;

            while(xTemp < 8){
                xTemp++;
                this._possibleMoves.push([xTemp, yTemp]);
            }

            xTemp = x, yTemp = y;

            while(xTemp >= 0){
                xTemp--;
                this._possibleMoves.push([xTemp, yTemp]);
            }

            xTemp = x, yTemp = y;

            while(yTemp < 8){
                yTemp++;
                this._possibleMoves.push([xTemp, yTemp]);
            }

            xTemp = x, yTemp = y;

            while(yTemp >= 0){
                yTemp--;
                this._possibleMoves.push([xTemp, yTemp]);
            }
        }

        this._generatePossibleMoves(position);
    }
    get generatePossibleMoves(){
        return this._generatePossibleMoves;
    }
}

export class Queen extends ChessPiece{
    constructor(color, position){
        super(color, position);
        this._possibleMoves = [];

        this._generatePossibleMoves = (position) => {
            this._possibleMoves = [];
            const [x, y] = position;

            let xTemp = x, yTemp = y;

            while(xTemp < 8 && yTemp < 8){
                xTemp++;
                yTemp++;
                this._possibleMoves.push([xTemp, yTemp]);
            }

            xTemp = x, yTemp = y;

            while(xTemp < 8 && yTemp >= 0){
                xTemp++;
                yTemp--;
                this._possibleMoves.push([xTemp, yTemp]);
            }

            xTemp = x, yTemp = y;

            while(xTemp >= 0 && yTemp < 8){
                xTemp--;
                yTemp++;
                this._possibleMoves.push([xTemp, yTemp]);
            }

            xTemp = x, yTemp = y;

            while(xTemp >= 0 && yTemp >= 0){
                xTemp--;
                yTemp--;
                this._possibleMoves.push([xTemp, yTemp]);
            }

            xTemp = x, yTemp = y;

            while(xTemp < 8){
                xTemp++;
                this._possibleMoves.push([xTemp, yTemp]);
            }

            xTemp = x, yTemp = y;

            while(xTemp >= 0){
                xTemp--;
                this._possibleMoves.push([xTemp, yTemp]);
            }

            xTemp = x, yTemp = y;

            while(yTemp < 8){
                yTemp++;
                this._possibleMoves.push([xTemp, yTemp]);
            }

            xTemp = x, yTemp = y;

            while(yTemp >= 0){
                yTemp--;
                this._possibleMoves.push([xTemp, yTemp]);
            }
        }
        
        this._generatePossibleMoves(position);
    }
    get generatePossibleMoves(){
        return this._generatePossibleMoves;
    }
}

export class King extends ChessPiece{
    constructor(color, position){
        super(color, position);
        this._possibleMoves = [];

        this._generatePossibleMoves = (position) => {
            this._possibleMoves = [];
            const [x, y] = position;

            if(x + 1 < 8 && y + 1 < 8){
                this._possibleMoves.push([x+1, y+1]);
            }
            else if(x + 1 < 8 && y - 1 >= 0){
                this._possibleMoves.push([x+1, y-1]);
            }
            else if(x - 1 >= 0 && y - 1 >= 0){
                this._possibleMoves.push([x-1, y-1]);
            }
            else if(x - 1 >= 0 && y + 1 < 8){
                this._possibleMoves.push([x-1, y+1]);
            }
            else if(x + 1 < 8){
                this._possibleMoves.push([x+1, y]);
            }
            else if(x - 1 >= 0){
                this._possibleMoves.push([x-1, y+1]);
            }
            else if(y + 1 < 8){
                this._possibleMoves.push([x, y+1]);
            }
            else if(y - 1 >= 0){
                this._possibleMoves.push([x, y-1]);
            }
        }
    }
}