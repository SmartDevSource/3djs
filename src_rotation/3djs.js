import { drawShape, Shape } from "./shapes.js"

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
})

//////////////// SHAPES ////////////////
const shape = new Shape([
                        [200, 200, 10],
                        [250, 200, 10],
                        [280, 250, 10],
                        [220, 250, 10],

                        [200, 200, -10],
                        [250, 200, -10],
                        [280, 250, -10],
                        [220, 250, -10],
                    ])
shape.scale(0)
        
let angle = 0

const scene = () => {
    angle += 0.01
    requestAnimationFrame(scene)
    ctx.clearRect(0, 0, screen.w, screen.h)
    shape.rotation.x = angle
    shape.rotation.y = angle
    shape.rotation.z = angle
    drawShape(ctx, shape, true)
}

scene()