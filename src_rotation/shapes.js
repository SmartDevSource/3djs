import {  Vector3, MatMul, MatToVec, Rotation }  from "./mathlib.js"

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
    for (let v in shape.vectors){
        const shapeCenter = shape.getCenter()
        const vectors = shape.vectors[v]
        const base = [[vectors.x - shapeCenter.x],
                      [vectors.y - shapeCenter.y],
                      [vectors.z - shapeCenter.z]]
        const xRot = MatMul(Rotation(shape.rotation.x).x, base)
        const yRot = MatMul(Rotation(shape.rotation.y).y, xRot)
        const zRot = MatMul(Rotation(shape.rotation.z).z, yRot)
        var rotation = MatToVec(zRot)
        rotation = {x: rotation.x + shapeCenter.x,
                    y: rotation.y + shapeCenter.y}
        
        shape.edges2d[v] = rotation
        if (showPoints) drawPoint(ctx, shape.edges2d[v].x,
                                       shape.edges2d[v].y)
    }

    for(let e in shape.edges2dPlaneConnections){
        const startPoint = shape.edges2d[e]
        const endPoint = shape.edges2d[shape.edges2dPlaneConnections[e]]
        drawLine(ctx, startPoint, endPoint, "white")
    }
    for(let e in shape.edges2dDepthConnections){
        const startPoint = shape.edges2d[e]
        const endPoint = shape.edges2d[shape.edges2dDepthConnections[e]]
        drawLine(ctx, startPoint, endPoint, "white")
    }
}