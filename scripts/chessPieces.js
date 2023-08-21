import { Map } from "./map.js";

class ChessPiece{
    constructor(color, position){
        this._name;
        this._color = color;
        this._position = position;
        this._possibleMoves = [];
        this._generatePossibleMoves;

        this._cantMove = (attacker) => {
            this._possibleMoves = [];
            const [xEnemy, yEnemy] = attacker.position;
            const [x, y] = this.position;

            if(this.name === 'Pawn'){
                if(this.color === 'black'){
                    if(xEnemy === x+1 && yEnemy === y+1){
                        this.possibleMoves.push([x+1, y+1]);
                    }
                    if(xEnemy === x+1 && yEnemy === y-1){
                        this.possibleMoves.push([x+1, y-1]);
                    }
                }
                else if(this.color === 'white'){
                    if(xEnemy === x-1 && yEnemy === y+1){
                        this.possibleMoves.push([x-1, y+1]);
                    }
                    if(xEnemy === x-1 && yEnemy === y-1){
                        this.possibleMoves.push([x-1, y-1]);
                    }
                }
            }
            else if(this.name === 'Horse'){
                if(x + 2 === xEnemy && y + 1 === yEnemy){
                    this._possibleMoves.push([x + 2, y + 1]);
                }
                if(x + 2 === xEnemy && y - 1 === yEnemy){
                    this._possibleMoves.push([x + 2, y - 1]);
                }
                if(x + 1 === xEnemy && y + 2 === yEnemy){
                    this._possibleMoves.push([x + 1, y + 2]);
                }
                if(x + 1 === xEnemy && y - 2 === yEnemy){
                    this._possibleMoves.push([x + 1, y - 2]);
                }
                if(x - 2 === xEnemy && y + 1 === yEnemy){
                    this._possibleMoves.push([x - 2, y + 1]);
                }
                if(x - 2 === xEnemy && y - 1 === yEnemy){
                    this._possibleMoves.push([x - 2, y - 1]);
                }
                if(x - 1 === xEnemy && y + 2 === yEnemy){
                    this._possibleMoves.push([x - 1, y + 2]);
                }
                if(x - 1 === xEnemy && y - 2 === yEnemy){
                    this._possibleMoves.push([x - 1, y - 2]);
                }
            }
            else if(this.name === 'Bishop'){
                const temp1 = [];
                const temp2 = [];
                const temp3 = [];
                const temp4 = [];

                let xTemp = x, yTemp = y;

                while(xTemp < 7 && yTemp < 7){
                    xTemp++;
                    yTemp++;
                    temp1.push([xTemp, yTemp]);
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        this._possibleMoves = temp1;
                        break;
                    }
                }

                xTemp = x, yTemp = y;

                while(xTemp < 7 && yTemp > 0){
                    xTemp++;
                    yTemp--;
                    temp2.push([xTemp, yTemp]);
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        this._possibleMoves = temp2;
                        break;
                    }
                }

                xTemp = x, yTemp = y;

                while(xTemp > 0 && yTemp < 7){
                    xTemp--;
                    yTemp++;
                    temp3.push([xTemp, yTemp]);
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        this._possibleMoves = temp3;
                        break;
                    }
                }

                xTemp = x, yTemp = y;

                while(xTemp > 0 && yTemp > 0){
                    xTemp--;
                    yTemp--;
                    temp4.push([xTemp, yTemp]);
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        this._possibleMoves = temp4;
                        break;
                    }
                }
            }
            else if(this.name === 'Rook'){
                const temp1 = [];
                const temp2 = [];
                const temp3 = [];
                const temp4 = [];

                let xTemp = x, yTemp = y;

                while(xTemp < 7){
                    xTemp++;
                    temp1.push([xTemp, yTemp]);
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        this._possibleMoves = temp1;
                        break;
                    }
                }
    
                xTemp = x, yTemp = y;
    
                while(xTemp > 0){
                    xTemp--;
                    temp2.push([xTemp, yTemp]);
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        this._possibleMoves = temp2;
                        break;
                    }
                }
    
                xTemp = x, yTemp = y;
    
                while(yTemp < 7){
                    yTemp++;
                    temp3.push([xTemp, yTemp]);
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        this._possibleMoves = temp3;
                        break;
                    }
                }
    
                xTemp = x, yTemp = y;
    
                while(yTemp > 0){
                    yTemp--;
                    temp4.push([xTemp, yTemp]);
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        this._possibleMoves = temp4;
                        break;
                    }
                }
            }
            else if(this.name === 'Queen'){
                const temp1 = [];
                const temp2 = [];
                const temp3 = [];
                const temp4 = [];
                const temp5 = [];
                const temp6 = [];
                const temp7 = [];
                const temp8 = [];

                let xTemp = x, yTemp = y;

                while(xTemp < 7 && yTemp < 7){
                    xTemp++;
                    yTemp++;
                    temp1.push([xTemp, yTemp]);
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        this._possibleMoves = temp1;
                        break;
                    }
                }

                xTemp = x, yTemp = y;

                while(xTemp < 7 && yTemp > 0){
                    xTemp++;
                    yTemp--;
                    temp2.push([xTemp, yTemp]);
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        this._possibleMoves = temp2;
                        break;
                    }
                }

                xTemp = x, yTemp = y;

                while(xTemp > 0 && yTemp < 7){
                    xTemp--;
                    yTemp++;
                    temp3.push([xTemp, yTemp]);
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        this._possibleMoves = temp3;
                        break;
                    }
                }

                xTemp = x, yTemp = y;

                while(xTemp > 0 && yTemp > 0){
                    xTemp--;
                    yTemp--;
                    temp4.push([xTemp, yTemp]);
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        this._possibleMoves = temp4;
                        break;
                    }
                }

                xTemp = x, yTemp = y;

                while(xTemp < 7){
                    xTemp++;
                    temp5.push([xTemp, yTemp]);
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        this._possibleMoves = temp5;
                        break;
                    }
                }
    
                xTemp = x, yTemp = y;
    
                while(xTemp > 0){
                    xTemp--;
                    temp6.push([xTemp, yTemp]);
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        this._possibleMoves = temp6;
                        break;
                    }
                }
    
                xTemp = x, yTemp = y;
    
                while(yTemp < 7){
                    yTemp++;
                    temp7.push([xTemp, yTemp]);
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        this._possibleMoves = temp7;
                        break;
                    }
                }
    
                xTemp = x, yTemp = y;
    
                while(yTemp > 0){
                    yTemp--;
                    temp8.push([xTemp, yTemp]);
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        this._possibleMoves = temp8;
                        break;
                    }
                }
            }
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
        this._name = 'Pawn';
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
        this._name = 'Horse';
        this._possibleMoves = [];

        this._generatePossibleMoves = () => {
            this._possibleMoves = [];
            const [x, y] = this.position;

            if(x + 2 < 8 && y + 1 < 8 && !Map.checkColor(x+2, y+1, this.color)){
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
            if(x - 2 >= 0 && y + 1 < 8 && !Map.checkColor(x-2, y+1, this.color)){
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
        this._name = 'Bishop';
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
        this._name = 'Rook';
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
        this._name = 'Queen';
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
        this._name = 'King';
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