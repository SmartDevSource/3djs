import { Triangle2D, Vector2, Vector3, Eq, Triangle3D }  from "./mathlib.js"

///////////////// DECLARATIONS /////////////////
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const screen = {w: window.innerWidth, h: window.innerHeight}

///////////////// EVENTS LISTENERS /////////////////
window.addEventListener("resize", ()=>{
    screen.w = window.innerWidth
    screen.h = window.innerHeight
    console.log("Screen size :", screen)
})

//////////////// SHAPES ////////////////
const triangle3D = new Triangle3D(
    new Vector3(20, 20, 1),
    new Vector3(20, 40, 1),
    new Vector3(60, 20, 1),
)
///////////////// FUNCTIONS /////////////////
const scene = () => {
    ctx.fillStyle = "red"
    drawTriangle(triangle3D.translate(new Vector3(0, 0, 0)).projection())
    requestAnimationFrame(scene)
}

const drawTriangle = (triangle) => {
    const xmin = Math.min(triangle.v1.x, triangle.v2.x, triangle.v3.x)
    const xmax = Math.max(triangle.v1.x, triangle.v2.x, triangle.v3.x)
    const ymin = Math.min(triangle.v1.y, triangle.v2.y, triangle.v3.y)
    const ymax = Math.max(triangle.v1.y, triangle.v2.y, triangle.v3.y)

    for (let y = ymin; y < ymax; y++){
        if (0 < y < screen.h){
            for(let x = xmin; x < xmax; x++){
                if (0 < x < screen.w){
                    const pos = new Vector2(x, y)
                    const w1 = Eq(pos, triangle.v3, triangle.v1)
                    const w2 = Eq(pos, triangle.v1, triangle.v2)
                    const w3 = Eq(pos, triangle.v2, triangle.v3)
                    if ((w1 > 0 && w2 > 0 && w3 > 0) || (-w1 > 0 && -w2 > 0 && -w3 > 0)){
                        ctx.fillRect(pos.x, pos.y, 1, 1)
                    }
                }
            }
        }
    }
}

scene()