///////////////// CLASSES /////////////////
export class Vector3{
    constructor(x, y, z){
        this.x = x
        this.y = y
        this.z = z
    }
}

export class Cube{
    constructor(v1, v2, v3, v4){
        this.vectors = {
            v1: v1,
            v2: v2,
            v3: v3,
            v4: v4,
        }
    }
    getCubeCenter(){
        const center = new Vector3(
            (this.vectors.v1.x + this.vectors.v2.x + this.vectors.v3.x + this.vectors.v4.x) / 4,
            (this.vectors.v1.y + this.vectors.v2.y + this.vectors.v3.y + this.vectors.v4.y) / 4,
            (this.vectors.v1.z + this.vectors.v2.z + this.vectors.v3.z + this.vectors.v4.z) / 4,
        )
        return center
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