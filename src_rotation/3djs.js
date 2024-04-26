import {  Vector3, Cube, MatMul, MatToVec, Rotation }  from "./mathlib.js"
import { drawShape } from "./shapes.js"
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
const cube = new Cube(200, 200, 20,
                      100, 100, 50)
cube.scale(10)
let angle = 0

const scene = () => {
    // angle += 0.01
    requestAnimationFrame(scene)
    ctx.clearRect(0, 0, screen.w, screen.h)
    cube.rotation.x = angle
    cube.rotation.y = angle
    cube.rotation.z = angle
    drawShape(ctx, cube, false)
}

scene()