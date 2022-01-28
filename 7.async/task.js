class AlarmClock {
	constructor() {
		this.alarmCollection = [];
		this.timerId = null;
	}

	addClock(time, callback, id) {

		if (!Number.isInteger(id)) {
			throw new Error('Не правильный айди');
		}
		if (this.alarmCollection.some(element => element.id === id)) {
			console.error('Такой айди звонка уже существует ');
		} else {
			this.alarmCollection.push({
				id,
				time,
				callback,
			});
		}
	}

	removeClock(id) {
		let len = this.alarmCollection.length;
		let tmp = this.alarmCollection.filter(element => element.id !== id);
		if (len > tmp.length) {
			this.alarmCollection = tmp;
			return true;
		}
		return false;
	}

	getCurrentFormattedTime() {
		let date = new Date;

		let hours = date.getHours();
		let minutes = date.getMinutes();
		if (String(minutes).length === 1) {
			minutes = '0' + minutes;
		}
		if (String(hours).length === 1) {
			hours = '0' + hours;
		}

		return (`${hours}:${minutes}`);
	}

	checkClock(alarmСlock) {
		if (alarmСlock.time === this.getCurrentFormattedTime()) {
			alarmСlock.callback();
		}
	}

	start() {
		this.timerId = setInterval(() => {
			this.alarmCollection.forEach(element => {
				this.checkClock(element);
			}, 30000);
		});
	}

	stop() {
		if (this.timerId) {
			clearInterval(this.timerId);
			this.timerId = null;
		}
	}

	printAlarms() {
		this.alarmCollection.forEach(element => {
			console.log(`${element.id} ${element.time}`)
		});
	}

	clearAlarms() {
		clearInterval(this.timerId);
		this.alarmCollection.length = 0;
	}
}

//================================== Tests

function testCase() {
	let phoneAlarm = new AlarmClock();
	phoneAlarm.start();
	phoneAlarm.addClock('22:01', () => { console.log('Пора вставать') }, 111);
	phoneAlarm.addClock('22:01', () => { console.log('Вставай уже') }, 222);
	phoneAlarm.addClock('22:01', () => { console.log('Вставай уже') }, 333);
	phoneAlarm.addClock('22:01', () => { console.log('Вставай уже') }, 444);
	phoneAlarm.addClock('22:01', () => { console.log('Вставай уже') }, 555);

	console.log(phoneAlarm.alarmCollection.length);
	console.log(phoneAlarm.removeClock(222));
	console.log(phoneAlarm.removeClock(223));
	console.log(phoneAlarm.alarmCollection.length);
	try { phoneAlarm.addClock('21:54', () => { console.log('Иди умываться!') }); }
	catch (error) {
	}
	phoneAlarm.printAlarms();

	phoneAlarm.removeClock(111);
	phoneAlarm.printAlarms();


	phoneAlarm.addClock('22:02', () => {
		console.log('Вставай а то проспишь!');
		phoneAlarm.clearAlarms();
		phoneAlarm.printAlarms();
	}, 3);
	phoneAlarm.addClock('21:15', () => { console.log('Пора вставать, а то проспишь') }, 1);

}

testCase();
