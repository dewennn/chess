import { Map } from "./map.js";

class ChessPiece{
    constructor(color, position){
        this._color = color;
        this._position = position;
        this._possibleMoves = [];
        this._generatePossibleMoves;

        this._cantMove = () => {
            this._possibleMoves = [];
        }
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
    get generatePossibleMoves(){
        return this._generatePossibleMoves;
    }
    get cantMove(){
        return this._cantMove;
    }
}

export class Pawn extends ChessPiece{
    constructor(color, position){
        super(color, position);
        this._firstMove = true;

        this._generatePossibleMoves = () => {
            const [x, y] = this.position;
            this._possibleMoves = [];
            
            if(this.color === 'black'){
                if(this._firstMove === true){
                    if(Map.checkEmpty(x + 1, y)){
                        this._possibleMoves.push([x + 1, y]);
                        if(Map.checkEmpty(x + 2, y)){
                            this._possibleMoves.push([x + 2, y]);
                        }
                    }
                    if(Map.checkColor(x + 1, y + 1, 'white')){
                        this._possibleMoves.push([x + 1, y + 1]);
                    }
                    if(Map.checkColor(x + 1, y - 1, 'white')){
                        this._possibleMoves.push([x + 1, y - 1]);
                    }
                }
                else{
                    if(Map.checkEmpty(x + 1, y)){
                        this._possibleMoves.push([x + 1, y]);
                    }
                    if(Map.checkColor(x + 1, y + 1, 'white')){
                        this._possibleMoves.push([x + 1, y + 1]);
                    }
                    if(Map.checkColor(x + 1, y - 1, 'white')){
                        this._possibleMoves.push([x + 1, y - 1]);
                    }
                }
            }
            else if(this.color === 'white'){
                if(this._firstMove === true){
                    if(Map.checkEmpty(x - 1, y)){
                        this._possibleMoves.push([x - 1, y]);
                        if(Map.checkEmpty(x - 2, y)){
                            this._possibleMoves.push([x - 2, y]);
                        }
                    }
                    if(Map.checkColor(x - 1, y + 1, 'black')){
                        this._possibleMoves.push([x - 1, y + 1]);
                    }
                    if(Map.checkColor(x - 1, y - 1, 'black')){
                        this._possibleMoves.push([x - 1, y - 1]);
                    }
                }
                else{
                    if(Map.checkEmpty(x - 1, y)){
                        this._possibleMoves.push([x - 1, y]);
                    }
                    if(Map.checkColor(x - 1, y + 1, 'black')){
                        this._possibleMoves.push([x - 1, y + 1]);
                    }
                    if(Map.checkColor(x - 1, y - 1, 'black')){
                        this._possibleMoves.push([x - 1, y - 1]);
                    }
                }
            }
        }
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
        this._possibleMoves = [];

        this._generatePossibleMoves = () => {
            this._possibleMoves = [];
            const [x, y] = this.position;

            if(x + 2 < 8 && y + 1 < 8&& !Map.checkColor(x+2, y+1, this.color)){
                this._possibleMoves.push([x + 2, y + 1]);
            }
            if(x + 2 < 8 && y - 1 >= 0 && !Map.checkColor(x+2, y-1, this.color)){
                this._possibleMoves.push([x + 2, y - 1]);
            }
            if(x + 1 < 8 && y + 2 < 8 && !Map.checkColor(x+1, y+2, this.color)){
                this._possibleMoves.push([x + 1, y + 2]);
            }
            if(x + 1 < 8 && y - 2 >= 0 && !Map.checkColor(x+1, y-2, this.color)){
                this._possibleMoves.push([x + 1, y - 2]);
            }
            if(x - 2 >= 0 && y + 1 < 8  && !Map.checkColor(x-2, y+1, this.color)){
                this._possibleMoves.push([x - 2, y + 1]);
            }
            if(x - 2 >= 0 && y - 1 >= 0 && !Map.checkColor(x-2, y-1, this.color)){
                this._possibleMoves.push([x - 2, y - 1]);
            }
            if(x - 1 >= 0 && y + 2 < 8 && !Map.checkColor(x-1, y+2, this.color)){
                this._possibleMoves.push([x - 1, y + 2]);
            }
            if(x - 1 >= 0 && y - 2 >= 0 && !Map.checkColor(x-1, y-2, this.color)){
                this._possibleMoves.push([x - 1, y - 2]);
            }
        }
    }
}

export class Bishop extends ChessPiece{
    constructor(color, position){
        super(color, position);
        this._possibleMoves = [];

        this._generatePossibleMoves = () => {
            this._possibleMoves = [];
            const [x, y] = this.position;

            let xTemp = x, yTemp = y;

            const enemy = this.color === 'black' ? 'white' : 'black';

            while(xTemp < 7 && yTemp < 7){
                xTemp++;
                yTemp++;
                if(Map.checkColor(xTemp, yTemp, this.color)) break;
                this._possibleMoves.push([xTemp, yTemp]);
                if(Map.checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(xTemp < 7 && yTemp > 0){
                xTemp++;
                yTemp--;
                if(Map.checkColor(xTemp, yTemp, this.color)) break;
                this._possibleMoves.push([xTemp, yTemp]);
                if(Map.checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(xTemp > 0 && yTemp < 7){
                xTemp--;
                yTemp++;
                if(Map.checkColor(xTemp, yTemp, this.color)) break;
                this._possibleMoves.push([xTemp, yTemp]);
                if(Map.checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(xTemp > 0 && yTemp > 0){
                xTemp--;
                yTemp--;
                if(Map.checkColor(xTemp, yTemp, this.color)) break;
                this._possibleMoves.push([xTemp, yTemp]);
                if(Map.checkColor(xTemp, yTemp, enemy)) break;
            }
        }
    }
}

export class Rook extends ChessPiece{
    constructor(color, position){
        super(color, position);
        this._possibleMoves = [];

        this._generatePossibleMoves = () => {
            this._possibleMoves = [];
            const [x, y] = this.position;

            let xTemp = x, yTemp = y;

            const enemy = this.color === 'black' ? 'white' : 'black';

            while(xTemp < 7){
                xTemp++;
                if(Map.checkColor(xTemp, yTemp, this.color)) break;
                this._possibleMoves.push([xTemp, yTemp]);
                if(Map.checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(xTemp > 0){
                xTemp--;
                if(Map.checkColor(xTemp, yTemp, this.color)) break;
                this._possibleMoves.push([xTemp, yTemp]);
                if(Map.checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(yTemp < 7){
                yTemp++;
                if(Map.checkColor(xTemp, yTemp, this.color)) break;
                this._possibleMoves.push([xTemp, yTemp]);
                if(Map.checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(yTemp > 0){
                yTemp--;
                if(Map.checkColor(xTemp, yTemp, this.color)) break;
                this._possibleMoves.push([xTemp, yTemp]);
                if(Map.checkColor(xTemp, yTemp, enemy)) break;
            }
        }
    }
}

export class Queen extends ChessPiece{
    constructor(color, position){
        super(color, position);
        this._possibleMoves = [];

        this._generatePossibleMoves = () => {
            this._possibleMoves = [];
            const [x, y] = this.position;

            let xTemp = x, yTemp = y;

            const enemy = this.color === 'black' ? 'white' : 'black';

            while(xTemp < 7 && yTemp < 7){
                xTemp++;
                yTemp++;
                if(Map.checkColor(xTemp, yTemp, this.color)) break;
                this._possibleMoves.push([xTemp, yTemp]);
                if(Map.checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(xTemp < 7 && yTemp > 0){
                xTemp++;
                yTemp--;
                if(Map.checkColor(xTemp, yTemp, this.color)) break;
                this._possibleMoves.push([xTemp, yTemp]);
                if(Map.checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(xTemp > 0 && yTemp < 7){
                xTemp--;
                yTemp++;
                if(Map.checkColor(xTemp, yTemp, this.color)) break;
                this._possibleMoves.push([xTemp, yTemp]);
                if(Map.checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(xTemp > 0 && yTemp > 0){
                xTemp--;
                yTemp--;
                if(Map.checkColor(xTemp, yTemp, this.color)) break;
                this._possibleMoves.push([xTemp, yTemp]);
                if(Map.checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(xTemp < 7){
                xTemp++;
                if(Map.checkColor(xTemp, yTemp, this.color)) break;
                this._possibleMoves.push([xTemp, yTemp]);
                if(Map.checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(xTemp > 0){
                xTemp--;
                if(Map.checkColor(xTemp, yTemp, this.color)) break;
                this._possibleMoves.push([xTemp, yTemp]);
                if(Map.checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(yTemp < 7){
                yTemp++;
                if(Map.checkColor(xTemp, yTemp, this.color)) break;
                this._possibleMoves.push([xTemp, yTemp]);
                if(Map.checkColor(xTemp, yTemp, enemy)) break;
            }

            xTemp = x, yTemp = y;

            while(yTemp > 0){
                yTemp--;
                if(Map.checkColor(xTemp, yTemp, this.color)) break;
                this._possibleMoves.push([xTemp, yTemp]);
                if(Map.checkColor(xTemp, yTemp, enemy)) break;
            }
        }
    }
}

export class King extends ChessPiece{
    constructor(color, position){
        super(color, position);
        this._possibleMoves = [];

        this._generatePossibleMoves = () => {
            this._possibleMoves = [];
            const [x, y] = this.position;

            if(x + 1 < 8 && y + 1 < 8 && !Map.checkColor(x+1, y+1, this.color)){
                this._possibleMoves.push([x+1, y+1]);
            }
            if(x + 1 < 8 && y - 1 >= 0 && !Map.checkColor(x+1, y-1, this.color)){
                this._possibleMoves.push([x+1, y-1]);
            }
            if(x - 1 >= 0 && y - 1 >= 0 && !Map.checkColor(x-1, y-1, this.color)){
                this._possibleMoves.push([x-1, y-1]);
            }
            if(x - 1 >= 0 && y + 1 < 8 && !Map.checkColor(x-1, y+1, this.color)){
                this._possibleMoves.push([x-1, y+1]);
            }
            if(x + 1 < 8 && !Map.checkColor(x+1, y, this.color)){
                this._possibleMoves.push([x+1, y]);
            }
            if(x - 1 >= 0  && !Map.checkColor(x-1, y, this.color)){
                this._possibleMoves.push([x-1, y]);
            }
            if(y + 1 < 8 && !Map.checkColor(x, y+1, this.color)){
                this._possibleMoves.push([x, y+1]);
            }
            if(y - 1 >= 0  && !Map.checkColor(x, y-1, this.color)){
                this._possibleMoves.push([x, y-1]);
            }
        }
    }
}