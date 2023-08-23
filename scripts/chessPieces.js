import { Map } from "./map.js";

class ChessPiece{
    constructor(color, position){
        this._name;
        this._color = color;
        this._position = position;
        this._possibleMoves = [];
        this._generatePossibleMoves;

        this._canBeBlock = (attacker, king) => {
            let blockable = [];
            const [xEnemy, yEnemy] = king.position;
            const [x, y] = attacker.position;

            if(attacker.name === 'Bishop'){
                const temp1 = [];
                const temp2 = [];
                const temp3 = [];
                const temp4 = [];

                let xTemp = x, yTemp = y;

                while(xTemp < 7 && yTemp < 7){
                    xTemp++;
                    yTemp++;
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        blockable = temp1;
                        break;
                    }
                    temp1.push([xTemp, yTemp]);
                }

                xTemp = x, yTemp = y;

                while(xTemp < 7 && yTemp > 0){
                    xTemp++;
                    yTemp--;
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        blockable = temp2;
                        break;
                    }
                    temp2.push([xTemp, yTemp]);
                }

                xTemp = x, yTemp = y;

                while(xTemp > 0 && yTemp < 7){
                    xTemp--;
                    yTemp++;
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        blockable = temp3;
                        break;
                    }
                    temp3.push([xTemp, yTemp]);
                }

                xTemp = x, yTemp = y;

                while(xTemp > 0 && yTemp > 0){
                    xTemp--;
                    yTemp--;
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        blockable = temp4;
                        break;
                    }
                    temp4.push([xTemp, yTemp]);
                }
            }
            else if(attacker.name === 'Rook'){
                const temp1 = [];
                const temp2 = [];
                const temp3 = [];
                const temp4 = [];

                let xTemp = x, yTemp = y;

                while(xTemp < 7){
                    xTemp++;
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        blockable = temp1;
                        break;
                    }
                    temp1.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(xTemp > 0){
                    xTemp--;
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        blockable = temp2;
                        break;
                    }
                    temp2.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(yTemp < 7){
                    yTemp++;
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        blockable = temp3;
                        break;
                    }
                    temp3.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(yTemp > 0){
                    yTemp--;
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        blockable = temp4;
                        break;
                    }
                    temp4.push([xTemp, yTemp]);
                }
            }
            else if(attacker.name === 'Queen'){
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
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        blockable = temp1;
                        break;
                    }
                    temp1.push([xTemp, yTemp]);
                }

                xTemp = x, yTemp = y;

                while(xTemp < 7 && yTemp > 0){
                    xTemp++;
                    yTemp--;
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        blockable = temp2;
                        break;
                    }
                    temp2.push([xTemp, yTemp]);
                }

                xTemp = x, yTemp = y;

                while(xTemp > 0 && yTemp < 7){
                    xTemp--;
                    yTemp++;
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        blockable = temp3;
                        break;
                    }
                    temp3.push([xTemp, yTemp]);
                }

                xTemp = x, yTemp = y;

                while(xTemp > 0 && yTemp > 0){
                    xTemp--;
                    yTemp--;
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        blockable = temp4;
                        break;
                    }
                    temp4.push([xTemp, yTemp]);
                }

                xTemp = x, yTemp = y;

                while(xTemp < 7){
                    xTemp++;
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        blockable = temp5;
                        break;
                    }
                    temp5.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(xTemp > 0){
                    xTemp--;
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        blockable = temp6;
                        break;
                    }
                    temp6.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(yTemp < 7){
                    yTemp++;
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        blockable = temp7;
                        break;
                    }
                    temp7.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(yTemp > 0){
                    yTemp--;
                    if(xTemp === xEnemy && yTemp === yEnemy){
                        blockable = temp8;
                        break;
                    }
                    temp8.push([xTemp, yTemp]);
                }
            }
            return blockable;
        }

        this._canBlock = (blockable, position) => {
            let result = false;
            blockable.forEach((blockPosition) => {
                if(blockPosition[0] === position[0] && blockPosition[1] === position[1]){
                    result = true;
                }
            });
            return result;
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

        this._cantMove = (attacker, king) => {
            this._possibleMoves = [];
            const [xEnemy, yEnemy] = attacker.position;
            const [x, y] = this.position;
            const blockable = this._canBeBlock(attacker, king);

            if(this.color === 'black'){
                if(this._firstMove === true && this._canBlock(blockable, [x+2, y]) === true){
                    this.possibleMoves.push([x+2, y]);
                }
                if(this._canBlock(blockable, [x+1, y]) === true){
                    this.possibleMoves.push([x+1, y]);
                }
                if(xEnemy === x+1 && yEnemy === y+1){
                    this.possibleMoves.push([x+1, y+1]);
                }
                if(xEnemy === x+1 && yEnemy === y-1){
                    this.possibleMoves.push([x+1, y-1]);
                }
            }
            else if(this.color === 'white'){
                if(this._firstMove === true && this._canBlock(blockable, [x-2, y]) === true){
                    this.possibleMoves.push([x-2, y]);
                }
                if(this._canBlock(blockable, [x-1, y]) === true){
                    this.possibleMoves.push([x-1, y]);
                }
                if(xEnemy === x-1 && yEnemy === y+1){
                    this.possibleMoves.push([x-1, y+1]);
                }
                if(xEnemy === x-1 && yEnemy === y-1){
                    this.possibleMoves.push([x-1, y-1]);
                }
            }
        }
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

        this._cantMove = (attacker, king) => {
            this._possibleMoves = [];
            const [xEnemy, yEnemy] = attacker.position;
            const [x, y] = this.position;
            const blockable = this._canBeBlock(attacker, king);

            if((x + 2 === xEnemy && y + 1 === yEnemy) || this._canBlock(blockable, [x+2, y+1])){
                this._possibleMoves.push([x + 2, y + 1]);
            }
            if((x + 2 === xEnemy && y - 1 === yEnemy) || this._canBlock(blockable, [x+2, y-1])){
                this._possibleMoves.push([x + 2, y - 1]);
            }
            if((x + 1 === xEnemy && y + 2 === yEnemy) || this._canBlock(blockable, [x+1, y+2])){
                this._possibleMoves.push([x + 1, y + 2]);
            }
            if((x + 1 === xEnemy && y - 2 === yEnemy) || this._canBlock(blockable, [x+1, y-2])){
                this._possibleMoves.push([x + 1, y - 2]);
            }
            if((x - 2 === xEnemy && y + 1 === yEnemy) || this._canBlock(blockable, [x-2, y+1])){
                this._possibleMoves.push([x - 2, y + 1]);
            }
            if((x - 2 === xEnemy && y - 1 === yEnemy) || this._canBlock(blockable, [x-2, y-1])){
                this._possibleMoves.push([x - 2, y - 1]);
            }
            if((x - 1 === xEnemy && y + 2 === yEnemy) || this._canBlock(blockable, [x-1, y+2])){
                this._possibleMoves.push([x - 1, y + 2]);
            }
            if((x - 1 === xEnemy && y - 2 === yEnemy) || this._canBlock(blockable, [x-1, y-2])){
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

        this._cantMove = (attacker, king) => {
            this._possibleMoves = [];
            const [xEnemy, yEnemy] = attacker.position;
            const [x, y] = this.position;
            const blockable = this._canBeBlock(attacker, king);

            let xTemp = x, yTemp = y;

                while(xTemp < 7 && yTemp < 7){
                    xTemp++;
                    yTemp++;
                    if(this._canBlock(blockable, [xTemp, yTemp])){
                        this._possibleMoves.push([xTemp, yTemp]);
                    }
                }

                xTemp = x, yTemp = y;

                while(xTemp < 7 && yTemp > 0){
                    xTemp++;
                    yTemp--;
                    if(this._canBlock(blockable, [xTemp, yTemp])){
                        this._possibleMoves.push([xTemp, yTemp]);
                    }
                }

                xTemp = x, yTemp = y;

                while(xTemp > 0 && yTemp < 7){
                    xTemp--;
                    yTemp++;
                    if(this._canBlock(blockable, [xTemp, yTemp])){
                        this._possibleMoves.push([xTemp, yTemp]);
                    }
                }

                xTemp = x, yTemp = y;

                while(xTemp > 0 && yTemp > 0){
                    xTemp--;
                    yTemp--;
                    if(this._canBlock(blockable, [xTemp, yTemp])){
                        this._possibleMoves.push([xTemp, yTemp]);
                    }
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

        this._cantMove = (attacker, king) => {
            this._possibleMoves = [];
            const [xEnemy, yEnemy] = attacker.position;
            const [x, y] = this.position;
            const blockable = this._canBeBlock(attacker, king);

            let xTemp = x, yTemp = y;

            while(xTemp < 7){
                xTemp++;
                if(this._canBlock(blockable, [xTemp, yTemp])){
                    this._possibleMoves.push([xTemp, yTemp]);
                }
            }

            xTemp = x, yTemp = y;

            while(xTemp > 0){
                xTemp--;
                if(this._canBlock(blockable, [xTemp, yTemp])){
                    this._possibleMoves.push([xTemp, yTemp]);
                }
            }

            xTemp = x, yTemp = y;

            while(yTemp < 7){
                yTemp++;
                if(this._canBlock(blockable, [xTemp, yTemp])){
                    this._possibleMoves.push([xTemp, yTemp]);
                }
            }

            xTemp = x, yTemp = y;

            while(yTemp > 0){
                yTemp--;
                if(this._canBlock(blockable, [xTemp, yTemp])){
                    this._possibleMoves.push([xTemp, yTemp]);
                }
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

        this._cantMove = (attacker, king) => {
            this._possibleMoves = [];
            const [xEnemy, yEnemy] = attacker.position;
            const [x, y] = this.position;
            const blockable = this._canBeBlock(attacker, king);

            let xTemp = x, yTemp = y;

            while(xTemp < 7 && yTemp < 7){
                xTemp++;
                yTemp++;
                if(this._canBlock(blockable, [xTemp, yTemp])){
                    this._possibleMoves.push([xTemp, yTemp]);
                }
            }

            xTemp = x, yTemp = y;

            while(xTemp < 7 && yTemp > 0){
                xTemp++;
                yTemp--;
                if(this._canBlock(blockable, [xTemp, yTemp])){
                    this._possibleMoves.push([xTemp, yTemp]);
                }
            }

            xTemp = x, yTemp = y;

            while(xTemp > 0 && yTemp < 7){
                xTemp--;
                yTemp++;
                if(this._canBlock(blockable, [xTemp, yTemp])){
                    this._possibleMoves.push([xTemp, yTemp]);
                }
            }

            xTemp = x, yTemp = y;

            while(xTemp > 0 && yTemp > 0){
                xTemp--;
                yTemp--;
                if(this._canBlock(blockable, [xTemp, yTemp])){
                    this._possibleMoves.push([xTemp, yTemp]);
                }
            }

            xTemp = x, yTemp = y;

            while(xTemp < 7){
                xTemp++;
                if(this._canBlock(blockable, [xTemp, yTemp])){
                    this._possibleMoves.push([xTemp, yTemp]);
                }
            }

            xTemp = x, yTemp = y;

            while(xTemp > 0){
                xTemp--;
                if(this._canBlock(blockable, [xTemp, yTemp])){
                    this._possibleMoves.push([xTemp, yTemp]);
                }
            }

            xTemp = x, yTemp = y;

            while(yTemp < 7){
                yTemp++;
                if(this._canBlock(blockable, [xTemp, yTemp])){
                    this._possibleMoves.push([xTemp, yTemp]);
                }
            }

            xTemp = x, yTemp = y;

            while(yTemp > 0){
                yTemp--;
                if(this._canBlock(blockable, [xTemp, yTemp])){
                    this._possibleMoves.push([xTemp, yTemp]);
                }
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