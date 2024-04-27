import {  Vector3, MatMul, MatToVec, Rotation }  from "./mathlib.js"

//// CLASSES ////
export class Object3D{
    constructor(ctx, objectData){
        this.ctx = ctx
        this.points = objectData.points
        this.connections = objectData.connections
        this.rotation = {
            x: 0,
            y: 0,
            z: 0
        }
        this.edges2d = new Array(objectData.length)
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
    drawPoint = (x, y) => {
        this.ctx.beginPath()
        this.ctx.fillStyle = "white"
        this.ctx.arc(x, y, 5, 0, Math.PI*2)
        this.ctx.fill()
        this.ctx.stroke()
    }
    drawLine = (v1, v2, color) => {
        this.ctx.beginPath()
        this.ctx.fillStyle = "white"
        this.ctx.lineWidth = 3
        this.ctx.moveTo(v1.x, v1.y)
        this.ctx.lineTo(v2.x, v2.y)
        this.ctx.strokeStyle = color
        this.ctx.stroke()
    }
    display = (camera, showPoints = false) => {
        for (let i in this.points){
            const base = [[this.points[i][0] - this.center.x],
                          [this.points[i][1] - this.center.y],
                          [this.points[i][2] - this.center.z]]
            const xRotation = MatMul(Rotation(this.rotation.x + camera.z).x, base)
            const yRotation = MatMul(Rotation(this.rotation.y + camera.x).y, xRotation)
            const zRotation = MatMul(Rotation(this.rotation.z).z, yRotation)
            var rotation = MatToVec(zRotation)
            rotation = {x: rotation.x + this.center.x,
                        y: rotation.y + this.center.y,
                        z: rotation.z + this.center.z}
            this.edges2d[i] = rotation
    
            if (showPoints){
                this.drawPoint(this.edges2d[i].x, 
                               this.edges2d[i].y)
            }
        }
        for (let i in this.connections){
            const from = this.connections[i][0]
            const to = this.connections[i][1]
            this.drawLine(this.edges2d[from], 
                    this.edges2d[to],
                    "white")
        }
    }
}