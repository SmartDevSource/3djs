export const Eq = (a, b, p) => (a.x-p.x)*(b.y-p.y)-(a.y-p.y)*(b.x-p.x)

export class Vector2{
    constructor(x, y){
        this.x = x
        this.y = y
    }
    innerDivider(v){
        return new Vector2(this.x / v, this.y / v)
    }
}

export class Vector3{
    constructor(x,y,z){
        this.x = x
        this.y = y
        this.z = z
    }
    innerDivider(v){
        return new Vector3(this.x / v.x, this.y / v.y, this.z / v.z)
    }
    innerAdder(v){
        return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z)
    }
    projection(){
        return new Vector2(this.x, this.y).innerDivider(this.z)
    }
}

export class Triangle2D{
    constructor(v1, v2, v3){
        this.v1 = v1
        this.v2 = v2
        this.v3 = v3
    }
}

export class Triangle3D{
    constructor(v1, v2, v3){
        this.v1 = v1
        this.v2 = v2
        this.v3 = v3
    }
    projection(){
        return new Triangle2D(this.v1.projection(), this.v2.projection(), this.v3.projection())
    }
    translate(v){
        return new Triangle3D(this.v1.innerAdder(v), this.v2.innerAdder(v), this.v3.innerAdder(v))
    }
}