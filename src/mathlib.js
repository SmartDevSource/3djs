///////////////// CLASSES /////////////////
export class Vector3{
    constructor(x, y, z){
        this.x = x
        this.y = y
        this.z = z
    }
}

///////////////// FUNCTIONS /////////////////
export const MatMul = (a, b) => {
    const matrix = new Array(a.length)
    const length = matrix.length
    for (let i = 0 ; i < length ; i++){
        matrix[i] = new Array(length)
        for (let j = 0 ; j < length ; j++){
            matrix[i][j] = 0
            for (let k = 0 ; k < length ; k++){
                matrix[i][j] += a[i][k] * b[k][j]
            }
            if (isNaN(matrix[i][j])) matrix[i][j] = 0
        }
    }
    return matrix
}

export const MatToVec = (m) => {
    return m.length == 2 ? {x: m[0][0], y: m[1][0]} :
                           {x: m[0][0], y: m[1][0], z: m[2][0]}
}

export const Rotation = angle => {
    return  {x: 
                [
                    [1, 0, 0],
                    [0, Math.cos(angle), -Math.sin(angle)],
                    [0, Math.sin(angle), Math.cos(angle)]
                ],
            y:
                [
                    [Math.cos(angle), 0, Math.sin(angle)],
                    [0, 1, 0],
                    [-Math.sin(angle), 0, Math.cos(angle)]
                ],
            z:
                [
                    [Math.cos(angle), -Math.sin(angle), 0],
                    [Math.sin(angle), Math.cos(angle), 0],
                    [0, 0, 1]
                ]
            }
}