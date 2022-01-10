
function parseCount(num) {
	num = Number.parseInt(num);
	if (Number.isNaN(num)) {
		throw new Error('Невалидное значение');
	}
	return num;
}

function validateCount(num) {
	try {
		num = parseCount(num);
	} catch (Error) {
		return Error;
	}
	return num;
}

class Triangle {
	constructor(a, b, c) {
		if ((a + b < c) || (a + c < b) || (b + c < a)) {
			throw new Error('Треугольник с такими сторонами не существует');
		}
		this.a = a;
		this.b = b;
		this.c = c;
	}

	getPerimeter() {
		return this.a + this.b + this.c;
	}

	getArea() {
		let p = 1 / 2 * (this.getPerimeter());
		return (+(Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c)).toFixed(3)));
	}

}

function getTriangle(a, b, c) {
	try {
		return new Triangle(a, b, c);
	} catch (Error) {
		return {
			getArea() {
				return 'Ошибка! Треугольник не существует';
			},
			getPerimeter() {
				return 'Ошибка! Треугольник не существует';
			}
		}
	}
}
