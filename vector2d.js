module.exports = class Vec2D {//from EKW
    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
    }
    
    // Vector-Vector operations.
    add(other) {
        return new Vec2D(this.x + other.x, this.y + other.y);
    }
    subtract(other) {
        return new Vec2D(this.x - other.x, this.y - other.y);
    }
    multiply(other) {
        return new Vec2D(this.x * other.x, this.y * other.y);
    }
    divide(other) {
        return new Vec2D(this.x / other.x, this.y / other.y);
    }
    mod(other) {
        return new Vec2D(this.x % other.x, this.y % other.y);
    }
    reverse() {
        return new Vec2D(this.x * -1, this.y * -1)
    }
 
    dot(other) { // This is a dot product operation. It's a thing you do with vectors sometimes.
        return (this.x * other.x) + (this.y * other.y);
    }

    // Vector-Scalar operations
    addScalar(val) {
        return new Vec2D(this.x + val, this.y + val);
    }
    subScalar(val) {
        return new Vec2D(this.x - val, this.y - val);
    }
    mulScalar(val) {
        return new Vec2D(this.x * val, this.y * val);
    }
    divScalar(val) {
        return new Vec2D(this.x / val, this.y / val);
    }
    modScalar(val) {
        return new Vec2D(this.x % val, this.y ^ val);
    }

    // Misc operations
    dist() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    negate() {
        return new Vec2D(-this.x, -this.y);
    }
    zero() {
        return new Vec2D(0,0)
    }
    angle() {
        return Math.atan2(this.y, this.x);
    }
    normalized() {
        if (this.dist() == 0){
            return new Vec2D(0,0)
        }
        return this.divScalar(this.dist());
    }
    distTo(object){
        return object.subtract(this).dist()
    }
    lookAt(object){
        return object.subtract(this).normalized()
    }
}
