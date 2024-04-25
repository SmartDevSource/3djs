import {  Vector3, Cube, MatMul, MatToVec, Rotation }  from "./mathlib.js"

///////////////// DECLARATIONS /////////////////
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const screen = {w: window.innerWidth, h: window.innerHeight}

const windowScale = window.devicePixelRatio
canvas.width = canvas.offsetWidth * windowScale
canvas.height = canvas.offsetHeight * windowScale

///////////////// EVENTS LISTENERS /////////////////
window.addEventListener("resize", ()=>{
    screen.w = window.innerWidth
    screen.h = window.innerHeight
    console.log("Screen size :", screen)
})

//////////////// SHAPES ////////////////
const drawPoint = (x, y) => {
    ctx.beginPath()
    ctx.fillStyle = "white"
    ctx.arc(x, y, 5, 0, Math.PI*2)
    ctx.fill()
    ctx.stroke()
}

const drawShape = shape => {
    for (let v in shape.vectors){
        const shapeCenter = shape.getCenter()
        const vectors = shape.vectors[v]
        let xRot = MatMul(Rotation(shape.rotation.x).x, 
            [[vectors.x - shapeCenter.x],
            [vectors.y - shapeCenter.y],
            [vectors.z - shapeCenter.z]])
        let yRot = MatMul(Rotation(shape.rotation.y).y, xRot)
        const rotation = MatToVec(MatMul(Rotation(shape.rotation.z).z, yRot))
        drawPoint(rotation.x + shapeCenter.x, rotation.y + shapeCenter.y)
    }
}

const cube = new Cube(150, 150, 20,
                      20, 20, 20)
cube.scale(50)
let angle = 0

const scene = () => {
    angle += 0.01
    requestAnimationFrame(scene)
    ctx.clearRect(0, 0, screen.w, screen.h)
    cube.rotation.y = angle
    drawShape(cube)
}

scene()