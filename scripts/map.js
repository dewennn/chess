export class Map{

    static kingInDanger = false;

    static positionMap = [
        [2, 2, 2, 2, 4, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 3, 1, 1, 1]
    ];

    static updatePositionMap(chessPieces){
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                Map.positionMap[i][j] = 0;
            }
        }

        chessPieces.forEach((row) => {
            row.forEach((piece) => {
                if(piece !== 0){
                    const [x, y] = piece.position;

                    if(piece.color === 'black' && piece.constructor.name === "King"){
                        Map.positionMap[x][y] = 4;
                    }
                    else if(piece.color === 'white' && piece.constructor.name === "King"){
                        Map.positionMap[x][y] = 3;
                    }
                    else if(piece.color === 'black'){
                        Map.positionMap[x][y] = 2;
                    }
                    else if(piece.color === 'white'){
                        Map.positionMap[x][y] = 1;
                    }
                }
            });
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

    static checkColor(x, y, color){
        if(color === 'black'){
            if(Map.positionMap[x][y] !== 2 && Map.positionMap[x][y] !== 4){
                return false;
            }
            else{
                return true;
            }
        }
        else if(color === 'white'){
            if(Map.positionMap[x][y] !== 1 && Map.positionMap[x][y] !== 3){
                return false;
            }
            else{
                return true;
            }
        }
    }

}

