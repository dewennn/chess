export class Map{
    constructor(){
        this._positionMap = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1]
        ];
    }

    updatePositionMap(chessPieces){
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                this._positionMap[i][j] = 0;
            }
        }

        chessPieces.forEach((piece) => {
            const [x, y] = piece.position;
            this._positionMap[x][y] = 1;
        });
    }

    checkEmpty(x, y){
        if(this._positionMap[x][y] === 1){
            return true;
        }
        else{
            return false;
        }
    }

}

