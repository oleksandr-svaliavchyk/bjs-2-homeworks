function cachingDecoratorNew(func) {
	// Ваш код
	let cache = {};
	return function wrapper(...rest) {
		let result;
		let key = rest.toString();
		if (key in cache) {
			result = 'Из кэша: ' + cache[key];
			return result;
		} else {
			let keys = Object.keys(cache);
			if (keys.length > 4) {
				delete cache[keys[0]];
			}
			result = func(...rest);
			cache[key] = result;
			result = 'Вычисляем: ' + result;
			return result;
		}
	}

}


function debounceDecoratorNew(func, ms) {
	// Ваш код
	let timer = null;

	return function wrapFunc() {
		if (timer === null) {
			func();
			timer = setTimeout(() => {
				timer = null;
			}, ms);
		}
	}
}

function debounceDecorator2(func, ms) {
	// Ваш код
	let timer = null, count = 0;


	return function wrapFunc() {
		count++;
		if (timer === null) {
			func();
			timer = setTimeout(() => {
				timer = null;
			}, ms);
		}
		wrapFunc.count = count;
		wrapFunc.showCount = () => {
			console.log(wrapFunc.count);
		};
	}

}

let a = debounceDecorator2(() => { console.log('vasya'), 1000 });
a.showCount();


const sendSignal = () => console.log("Сигнал отправлен");
const upgradedSendSignal = debounceDecorator2(sendSignal, 2000);
setTimeout(upgradedSendSignal); // Сигнал отправлен
setTimeout(upgradedSendSignal, 300); // проигнорировано так как от последнего вызова прошло менее 2000мс (300 - 0 < 2000)
setTimeout(upgradedSendSignal, 900); // проигнорировано так как времени от последнего вызова прошло: 900-300=600 (600 < 2000)
setTimeout(upgradedSendSignal, 1200); // проигнорировано так как времени от последнего вызова прошло: 1200-900=300 (300 < 2000)
setTimeout(upgradedSendSignal, 2300); // проигнорировано так как времени от последнего вызова прошло: 2300-1200=1100 (1100 < 2000)
setTimeout(upgradedSendSignal, 4400); // Сигнал отправлен так как времени от последнего вызова прошло: 4400-2300=2100 (2100 > 2000)
setTimeout(upgradedSendSignal, 4500); // Сигнал будет отправлен, так как последний вызов debounce декоратора (спустя 4500 + 2000 = 6500) 6,5с