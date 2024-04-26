import {  Vector3, MatMul, MatToVec, Rotation }  from "./mathlib.js"

//// CLASSES ////
export class Shape{
    constructor(points){
        this.points = points
        this.rotation = {
            x: 0,
            y: 0,
            z: 0
        }
        this.edges2d = new Array(points.length)
        this.center = this.getCenter()
    }
    getCenter(){
        const center = {x: 0, y: 0, z: 0}
        for (let p in this.points){
            center.x += this.points[p][0]
            center.y += this.points[p][1]
            center.z += this.points[p][2]
        }
        center.x /= this.points.length
        center.y /= this.points.length
        center.z /= this.points.length
        return center
    }
    scale(size){
        for (let i in this.points){
            if (this.points[i][0] < this.center.x && 
                this.points[i][1] < this.center.y){
                this.points[i][0] -= size
                this.points[i][1] -= size
            }
            if (this.points[i][0] > this.center.x && 
                this.points[i][1] > this.center.y){
                this.points[i][0] += size
                this.points[i][1] += size
            }
            if (this.points[i][2] < this.center.z){
                this.points[i][2] -= size
            }
            if (this.points[i][2] > this.center.z){
                this.points[i][2] += size
            }
        }           
    }
}

//// FUNCTIONS ////
export const drawPoint = (ctx, x, y) => {
    ctx.beginPath()
    ctx.fillStyle = "white"
    ctx.arc(x, y, 5, 0, Math.PI*2)
    ctx.fill()
    ctx.stroke()
}

export const drawLine = (ctx, v1, v2, color) => {
    ctx.beginPath()
    ctx.fillStyle = "white"
    ctx.lineWidth = 3
    ctx.moveTo(v1.x, v1.y)
    ctx.lineTo(v2.x, v2.y)
    ctx.strokeStyle = color
    ctx.stroke()
}

export const drawShape = (ctx, shape, showPoints = false) => {
    for (let p in shape.points){
        const base = [[shape.points[p][0] - shape.center.x],
                      [shape.points[p][1] - shape.center.y],
                      [shape.points[p][2] - shape.center.z]]
        const xRotation = MatMul(Rotation(shape.rotation.x).x, base)
        const yRotation = MatMul(Rotation(shape.rotation.y).y, xRotation)
        const zRotation = MatMul(Rotation(shape.rotation.z).z, yRotation)
        var rotation = MatToVec(zRotation)
        rotation = {x: rotation.x + shape.center.x,
                    y: rotation.y + shape.center.y,
                    z: rotation.z + shape.center.z}
        shape.edges2d[p] = rotation
        if (showPoints) drawPoint(ctx, shape.edges2d[p].x, shape.edges2d[p].y)
    }

}