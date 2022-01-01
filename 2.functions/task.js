// Задание 1
function getArrayParams(arr) {
	let min, max, sum, avg;

	// Ваш код
	min = max = arr[0];
	sum = 0;

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] < min) {
			min = arr[i];
		}
		else if (arr[i] > max) {
			max = arr[i];
		}
		sum += arr[i];
	}
	avg = sum / arr.length;
	avg = +(avg.toFixed(2));
	return { min: min, max: max, avg: avg };
}

// Задание 2
function worker(arr) {
	let sum = 0;

	// Ваш код
	for (let i = 0; i < arr.length; i++) {
		sum += arr[i];
	}

	return sum;
}

function makeWork(arrOfArr, func) {
	let max = func(arrOfArr[0]);
	for (let i = 1; i < arrOfArr.length; i++) {
		let n = func(arrOfArr[i]);
		if (n > max) {
			max = n;
		}
	}
	return max;
}

// Задание 3
function worker2(arr) {
	let n = getArrayParams(arr);
	return (Math.abs(n.min - n.max));
}
