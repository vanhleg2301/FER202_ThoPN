class Shape {
    constructor(color = '') {
        this.color = color;
    }

    // Abstract method - to be implemented by subclasses
    getArea() {
        throw new Error('Method "getArea()" must be implemented.');
    }

    toString() {
        return `Shape with color ${this.color}`;
    }
}

class Rectangle extends Shape {
    constructor(length, width, color = '') {
        super(color);
        this.length = length;
        this.width = width;
    }

    getArea() {
        return this.length * this.width;
    }

    toString() {
        return `Rectangle with length ${this.length}, width ${this.width}, and color ${this.color}`;
    }
}

class Triangle extends Shape {
    constructor(base, height, color = '') {
        super(color);
        this.base = base;
        this.height = height;
    }

    getArea() {
        return 0.5 * this.base * this.height;
    }

    toString() {
        return `Triangle with base ${this.base}, height ${this.height}, and color ${this.color}`;
    }
}

class Circle extends Shape {
    constructor(radius, color = '') {
        super(color);
        this.radius = radius;
    }
}

console.log(new Shape('green').toString()); // Output: Shape with color green
console.log(new Rectangle(4, 5, 'red').getArea()); // Output: Rectangle with length 4, width 5, and color red
console.log(new Triangle(4, 5, 'blue').getArea()); // Output: Triangle with base 4, height 5, and color blue
