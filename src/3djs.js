import { Object3D } from "./object3d.js"

//////////////// DECLARATIONS ////////////////
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const screen = {w: window.innerWidth, h: window.innerHeight}

const windowScale = window.devicePixelRatio
canvas.width = canvas.offsetWidth * windowScale
canvas.height = canvas.offsetHeight * windowScale

//////////////// FUNCTIONS ////////////////
const loadObject = async objectName => {
    try{
        return await fetch(`../3d_objects/${objectName}`)
        .then(res=>res.json())
        .then(data=> data)
    } catch (err) {
        console.error("Le fichier json n'a pas été trouvé ")
    }
}

//////////////// EVENTS LISTENERS ////////////////
window.addEventListener("resize", ()=>{
    screen.w = window.innerWidth
    screen.h = window.innerHeight
})

//////////////// SHAPES ////////////////
const losangeData = await loadObject('losange.json')
const losange = new Object3D(ctx, losangeData)

let angle = 0
const camera = {
    x: 0, 
    y: 0, 
    z: 0
}

const scene = () => {
    angle += 0.01
    requestAnimationFrame(scene)
    ctx.clearRect(0, 0, screen.w, screen.h)
    // losange.rotation.x = angle
    // losange.rotation.y = angle
    // losange.rotation.z = angle
    losange.display(camera, false)
}

scene()