export class Map{

    static positionMap = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
    ];

    static updatePositionMap(chessPieces){
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                Map.positionMap[i][j] = 0;
            }
        }

        chessPieces.forEach((piece) => {
            const [x, y] = piece.position;
            Map.positionMap[x][y] = 1;
        });
    }

    static checkEmpty(x, y){
        if(Map.positionMap[x][y] !== 0){
            return false;
        }
        else{
            return true;
        }
    }

}

