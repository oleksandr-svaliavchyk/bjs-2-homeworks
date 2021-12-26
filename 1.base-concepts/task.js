"use strict";

function solveEquation(a, b, c) {

	let arr = [];
	// код для задачи №1 писать здесь
	let d = b * b - 4 * a * c;
	if (d === 0) {
		arr.push(-b / (2 * a));
	} else if (d > 0) {
		arr.push((-b + Math.sqrt(d)) / (2 * a));
		arr.push((-b - Math.sqrt(d)) / (2 * a));
	}
	return arr; // array
}

function calculateTotalMortgage(percent, contribution, amount, date) {
	let totalAmount;

	// код для задачи №2 писать здесь
	if (Number.isNaN(Number(percent))) {
		totalAmount = `Параметр "Процентная ставка" содержит неправильное значение "${percent}"`;
	}
	else if (Number.isNaN(Number(contribution))) {
		totalAmount = `Параметр "Начальный взнос" содержит неправильное значение "${contribution}"`;
	}
	else if (Number.isNaN(Number(amount))) {
		totalAmount = `Параметр "Общая стоимость" содержит неправильное значение "${amount}"`;
	}
	else {
		let s = amount - contribution;	// loan body
		let p = percent / 100 / 12;		// %/year = 1 month %
		let n = monthDiff(new Date, date); 		// n - count of month
		let monthPay = (
			s *
			(
				p +
				(
					p /
					(
						(Math.pow((1 + p), n) - 1)
					)
				)
			)
		);
		totalAmount = monthPay * n;
		totalAmount = +(totalAmount.toFixed(2)); // + convert String to Number 

	}

	return totalAmount;
}

function monthDiff(d1, d2) {
	var months;
	months = (d2.getFullYear() - d1.getFullYear()) * 12;
	months -= d1.getMonth();
	months += d2.getMonth();
	return months <= 0 ? 0 : months;
}