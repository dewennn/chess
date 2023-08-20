import { Map } from "./map.js";

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

        this._generatePossibleMoves = () => {
            this._possibleMoves = [];
            const [x, y] = this.position;
            
            if(this.color === 'black'){
                if(this._firstMove === true){
                    if(Map.checkEmpty(x + 1, y)){
                        this._possibleMoves.push([x + 1, y]);
                    }
                    if(Map.checkEmpty(x + 2, y)){
                        this._possibleMoves.push([x + 2, y]);
                    }
                    this._firstMove = false;
                }
                else{
                    if(Map.checkEmpty(x + 1, y)){
                        this._possibleMoves.push([x + 1, y]);
                    }
                }
            }
            else if(this.color === 'white'){
                if(this._firstMove === true){
                    if(Map.checkEmpty(x - 1, y)){
                        this._possibleMoves.push([x - 1, y]);
                    }
                    if(Map.checkEmpty(x - 2, y)){
                        this._possibleMoves.push([x - 2, y]);
                    }
                    this._firstMove = false;
                }
                else{
                    this._possibleMoves.push([x - 1, y]);
                }
            }
        }
    }
    get possibleMoves(){
        return this._possibleMoves;
    }
    get generatePossibleMoves(){
        return this._generatePossibleMoves;
    }
}

export class Horse extends ChessPiece{
    constructor(color, position){
        super(color, position);
        this._possibleMoves = [];

        this._generatePossibleMoves = () => {
            this._possibleMoves = [];
            const [x, y] = this.position;

            if(this.color === 'black'){
                if(x + 2 < 8 && y + 1 < 8&& !Map.checkBlack(x+2, y+1)){
                    this._possibleMoves.push([x + 2, y + 1]);
                }
                if(x + 2 < 8 && y - 1 >= 0 && !Map.checkBlack(x+2, y-1)){
                    this._possibleMoves.push([x + 2, y - 1]);
                }
                if(x + 1 < 8 && y + 2 < 8 && !Map.checkBlack(x+1, y+2)){
                    this._possibleMoves.push([x + 1, y + 2]);
                }
                if(x + 1 < 8 && y - 2 >= 0 && !Map.checkBlack(x+1, y-2)){
                    this._possibleMoves.push([x + 1, y - 2]);
                }
                if(x - 2 >= 0 && y + 1 < 8  && !Map.checkBlack(x-2, y+1)){
                    this._possibleMoves.push([x - 2, y + 1]);
                }
                if(x - 2 >= 0 && y - 1 >= 0 && !Map.checkBlack(x-2, y-1)){
                    this._possibleMoves.push([x - 2, y - 1]);
                }
                if(x - 1 >= 0 && y + 2 < 8 && !Map.checkBlack(x-1, y+2)){
                    this._possibleMoves.push([x - 1, y + 2]);
                }
                if(x - 1 >= 0 && y - 2 >= 0 && !Map.checkBlack(x-1, y-2)){
                    this._possibleMoves.push([x - 1, y - 2]);
                }
            }
            else if(this.color === 'white'){
                if(x + 2 < 8 && y + 1 < 8 && !Map.checkWhite(x+2, y+1)){
                    this._possibleMoves.push([x + 2, y + 1]);
                }
                if(x + 2 < 8 && y - 1 >= 0 && !Map.checkWhite(x+2, y-1)){
                    this._possibleMoves.push([x + 2, y - 1]);
                }
                if(x + 1 < 8 && y + 2 < 8 && !Map.checkWhite(x+1, y+2)){
                    this._possibleMoves.push([x + 1, y + 2]);
                }
                if(x + 1 < 8 && y - 2 >= 0 && !Map.checkWhite(x+1, y-2)){
                    this._possibleMoves.push([x + 1, y - 2]);
                }
                if(x - 2 >= 0 && y + 1 < 8  && !Map.checkWhite(x-2, y+1)){
                    this._possibleMoves.push([x - 2, y + 1]);
                }
                if(x - 2 >= 0 && y - 1 >= 0 && !Map.checkWhite(x-2, y-1)){
                    this._possibleMoves.push([x - 2, y - 1]);
                }
                if(x - 1 >= 0 && y + 2 < 8 && !Map.checkWhite(x-1, y+2)){
                    this._possibleMoves.push([x - 1, y + 2]);
                }
                if(x - 1 >= 0 && y - 2 >= 0 && !Map.checkWhite(x-1, y-2)){
                    this._possibleMoves.push([x - 1, y - 2]);
                }
            }
        }
    }
    get possibleMoves(){
        return this._possibleMoves;
    }
    get generatePossibleMoves(){
        return this._generatePossibleMoves;
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
            
            if(this.color === 'black'){
                while(xTemp < 7 && yTemp < 7){
                    xTemp++;
                    yTemp++;
                    if(Map.checkBlack(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(xTemp < 7 && yTemp > 0){
                    xTemp++;
                    yTemp--;
                    if(Map.checkBlack(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(xTemp > 0 && yTemp < 7){
                    xTemp--;
                    yTemp++;
                    if(Map.checkBlack(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(xTemp > 0 && yTemp > 0){
                    xTemp--;
                    yTemp--;
                    if(Map.checkBlack(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
            }
            else if(this.color === 'white'){
                while(xTemp < 7 && yTemp < 7){
                    xTemp++;
                    yTemp++;
                    if(Map.checkWhite(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(xTemp < 7 && yTemp > 0){
                    xTemp++;
                    yTemp--;
                    if(Map.checkWhite(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(xTemp > 0 && yTemp < 7){
                    xTemp--;
                    yTemp++;
                    if(Map.checkWhite(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(xTemp > 0 && yTemp > 0){
                    xTemp--;
                    yTemp--;
                    if(Map.checkWhite(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
            }
        }
    }
    get possibleMoves(){
        return this._possibleMoves;
    }
    get generatePossibleMoves(){
        return this._generatePossibleMoves;
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

            if(this.color === 'black'){
                while(xTemp < 7){
                    xTemp++;
                    if(Map.checkBlack(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(xTemp > 0){
                    xTemp--;
                    if(Map.checkBlack(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(yTemp < 7){
                    yTemp++;
                    if(Map.checkBlack(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(yTemp > 0){
                    yTemp--;
                    if(Map.checkBlack(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
            }
            else if(this.color === 'white'){
                while(xTemp < 7){
                    xTemp++;
                    if(Map.checkWhite(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(xTemp > 0){
                    xTemp--;
                    if(Map.checkWhite(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(yTemp < 7){
                    yTemp++;
                    if(Map.checkWhite(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(yTemp > 0){
                    yTemp--;
                    if(Map.checkWhite(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
            }
        }
    }
    get possibleMoves(){
        return this._possibleMoves;
    }
    get generatePossibleMoves(){
        return this._generatePossibleMoves;
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

            if(this.color === 'black'){
                while(xTemp < 7 && yTemp < 7){
                    xTemp++;
                    yTemp++;
                    if(Map.checkBlack(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(xTemp < 7 && yTemp > 0){
                    xTemp++;
                    yTemp--;
                    if(Map.checkBlack(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(xTemp > 0 && yTemp < 7){
                    xTemp--;
                    yTemp++;
                    if(Map.checkBlack(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(xTemp > 0 && yTemp > 0){
                    xTemp--;
                    yTemp--;
                    if(Map.checkBlack(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }

                xTemp = x, yTemp = y;

                while(xTemp < 7){
                    xTemp++;
                    if(Map.checkBlack(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(xTemp > 0){
                    xTemp--;
                    if(Map.checkBlack(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(yTemp < 7){
                    yTemp++;
                    if(Map.checkBlack(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(yTemp > 0){
                    yTemp--;
                    if(Map.checkBlack(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
            }
            else if(this.color === 'white'){
                while(xTemp < 7 && yTemp < 7){
                    xTemp++;
                    yTemp++;
                    if(Map.checkWhite(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(xTemp < 7 && yTemp > 0){
                    xTemp++;
                    yTemp--;
                    if(Map.checkWhite(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(xTemp > 0 && yTemp < 7){
                    xTemp--;
                    yTemp++;
                    if(Map.checkWhite(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(xTemp > 0 && yTemp > 0){
                    xTemp--;
                    yTemp--;
                    if(Map.checkWhite(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }

                xTemp = x, yTemp = y;

                while(xTemp < 7){
                    xTemp++;
                    if(Map.checkWhite(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(xTemp > 0){
                    xTemp--;
                    if(Map.checkWhite(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(yTemp < 7){
                    yTemp++;
                    if(Map.checkWhite(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
    
                xTemp = x, yTemp = y;
    
                while(yTemp > 0){
                    yTemp--;
                    if(Map.checkWhite(xTemp, yTemp)) break;
                    this._possibleMoves.push([xTemp, yTemp]);
                }
            }
        }
    }
    get possibleMoves(){
        return this._possibleMoves;
    }
    get generatePossibleMoves(){
        return this._generatePossibleMoves;
    }
}

export class King extends ChessPiece{
    constructor(color, position){
        super(color, position);
        this._possibleMoves = [];

        this._generatePossibleMoves = () => {
            this._possibleMoves = [];
            const [x, y] = this.position;

            if(this.color === 'black'){
                if(x + 1 < 8 && y + 1 < 8 && !Map.checkBlack(x+1, y+1)){
                    this._possibleMoves.push([x+1, y+1]);
                }
                if(x + 1 < 8 && y - 1 >= 0 && !Map.checkBlack(x+1, y-1)){
                    this._possibleMoves.push([x+1, y-1]);
                }
                if(x - 1 >= 0 && y - 1 >= 0 && !Map.checkBlack(x-1, y-1)){
                    this._possibleMoves.push([x-1, y-1]);
                }
                if(x - 1 >= 0 && y + 1 < 8 && !Map.checkBlack(x-1, y+1)){
                    this._possibleMoves.push([x-1, y+1]);
                }
                if(x + 1 < 8 && !Map.checkBlack(x+1, y)){
                    this._possibleMoves.push([x+1, y]);
                }
                if(x - 1 >= 0  && !Map.checkBlack(x-1, y)){
                    this._possibleMoves.push([x-1, y]);
                }
                if(y + 1 < 8 && !Map.checkBlack(x, y+1)){
                    this._possibleMoves.push([x, y+1]);
                }
                if(y - 1 >= 0  && !Map.checkBlack(x, y-1)){
                    this._possibleMoves.push([x, y-1]);
                }
            }
            else if(this.color === 'white'){
                if(x + 1 < 8 && y + 1 < 8 && !Map.checkWhite(x+1, y+1)){
                    this._possibleMoves.push([x+1, y+1]);
                }
                if(x + 1 < 8 && y - 1 >= 0 && !Map.checkWhite(x+1, y-1)){
                    this._possibleMoves.push([x+1, y-1]);
                }
                if(x - 1 >= 0 && y - 1 >= 0 && !Map.checkWhite(x-1, y-1)){
                    this._possibleMoves.push([x-1, y-1]);
                }
                if(x - 1 >= 0 && y + 1 < 8 && !Map.checkWhite(x-1, y+1)){
                    this._possibleMoves.push([x-1, y+1]);
                }
                if(x + 1 < 8 && !Map.checkWhite(x+1, y)){
                    this._possibleMoves.push([x+1, y]);
                }
                if(x - 1 >= 0  && !Map.checkWhite(x-1, y)){
                    this._possibleMoves.push([x-1, y]);
                }
                if(y + 1 < 8 && !Map.checkWhite(x, y+1)){
                    this._possibleMoves.push([x, y+1]);
                }
                if(y - 1 >= 0  && !Map.checkWhite(x, y-1)){
                    this._possibleMoves.push([x, y-1]);
                }
            }
        }
    }
    get possibleMoves(){
        return this._possibleMoves;
    }
    get generatePossibleMoves(){
        return this._generatePossibleMoves;
    }
}