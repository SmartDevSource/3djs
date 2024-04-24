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

const cube = new Cube(
    new Vector3(150, 150, -25),
    new Vector3(200, 150, -25),
    new Vector3(200, 200, -25),
    new Vector3(150, 200, -25)
)

let angle = 0

const scene = () => {
    angle += 0.01
    requestAnimationFrame(scene)
    ctx.clearRect(0, 0, screen.w, screen.h)
    const cubeCenter = cube.getCubeCenter()

    for (let v in cube.vectors){
        const vec = cube.vectors[v]
        const matToVec = MatToVec(MatMul(Rotation(angle).x, 
            [[vec.x - cubeCenter.x],
            [vec.y - cubeCenter.y],
            [vec.z - cubeCenter.z]]))
        drawPoint(matToVec.x + cubeCenter.x, matToVec.y + cubeCenter.y)
    }
}

scene()