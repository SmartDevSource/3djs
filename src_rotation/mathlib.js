///////////////// CLASSES /////////////////
export class Vector3{
    constructor(x, y, z){
        this.x = x
        this.y = y
        this.z = z
    }
}

export class Cube{
    constructor(px, py, pz, width, height, depth){
        this.vectors = {
            v1: {x: px, y: py, z: pz},
            v2: {x: px + width, y: py, z: pz},
            v3: {x: px + width, y: py + height, z: pz},
            v4: {x: px, y: py + height, z: pz},
            v1z: {x: px, y: py, z: pz + depth},
            v2z: {x: px + width, y: py, z: pz + depth},
            v3z: {x: px + width, y: py + height, z:pz + depth},
            v4z: {x: px, y: py + height, z: pz + depth}
        }
        this.rotation = {
            x: 0,
            y: 0,
            z: 0
        }
        this.edges2d = {
            v1: {x: px, y: py},
            v2: {x: px + width, y: py},
            v3: {x: px + width, y: py + height},
            v4: {x: px, y: py + height},
            v4z: {x: px, y: py + depth},
            v3z: {x: px + width, y: py},
            v2z: {x: px + width, y: py + height},
            v1z: {x: px, y: py + height}
        }
        this.edges2dPlaneConnections = {
            v1z: 'v2z',
            v2z: 'v3z',
            v3z: 'v4z',
            v4z: 'v1z',
            v1: 'v1z',
            v2: 'v2z',
            v3: 'v3z',
            v4: 'v4z',
        }
        this.edges2dDepthConnections = {
            v1: 'v2',
            v2: 'v3',
            v3: 'v4',
            v4: 'v1'
        }
    }
    scale(size){
        this.vectors = {
            v1: {x: this.vectors.v1.x - size/2, 
                 y: this.vectors.v1.y - size/2, 
                 z: this.vectors.v1.z - size/2},

            v2: {x: this.vectors.v2.x + size/2, 
                 y: this.vectors.v2.y - size/2, 
                 z: this.vectors.v2.z - size/2},

            v3: {x: this.vectors.v3.x + size/2,
                 y: this.vectors.v3.y + size/2, 
                 z: this.vectors.v3.z - size/2},

            v4: {x: this.vectors.v4.x - size/2,
                 y: this.vectors.v4.y + size/2, 
                 z: this.vectors.v4.z - size/2},

            v1z: {x: this.vectors.v1z.x - size/2, 
                 y: this.vectors.v1z.y - size/2, 
                 z: this.vectors.v1z.z + size/2},

            v2z: {x: this.vectors.v2z.x + size/2, 
                 y: this.vectors.v2z.y - size/2, 
                 z: this.vectors.v2z.z + size/2},            

            v3z: {x: this.vectors.v3z.x + size/2,
                 y: this.vectors.v3z.y + size/2, 
                 z: this.vectors.v3z.z + size/2},  
                 
            v4z: {x: this.vectors.v4z.x - size/2,
                 y: this.vectors.v4z.y + size/2, 
                 z: this.vectors.v4z.z + size/2},
        }
    }
    getCenter(){
        return new Vector3(
            (this.vectors.v1.x + this.vectors.v2.x + this.vectors.v3.x + this.vectors.v4.x) / 4,
            (this.vectors.v1.y + this.vectors.v2.y + this.vectors.v3.y + this.vectors.v4.y) / 4,
            (this.vectors.v1.z + this.vectors.v2.z + this.vectors.v3.z + this.vectors.v4.z) / 4,
        )
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