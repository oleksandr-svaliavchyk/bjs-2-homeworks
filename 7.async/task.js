class AlarmClock {
	constructor() {
		this.alarmCollection = [];
		this.timerId = null;
	}

	addClock(time, callback, id) {

		if (!Number.isInteger(id)) {
			throw new Error('Не правильный айди');
		}
		if (this.alarmCollection.some(element => {
			if (element.id === id) {
				return true;
			}
		})) {
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
		this.alarmCollection.filter((element, idx) => {
			if (element.id === id) {
				this.alarmCollection.splice(idx, 1);
				return 1;
			}
		});
		return 0;
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
	phoneAlarm.addClock('22:01', () => { console.log('Пора вставать') }, 1);
	phoneAlarm.addClock('22:01', () => { console.log('Вставай уже') }, 2);
	try { phoneAlarm.addClock('21:54', () => { console.log('Иди умываться!') }); }
	catch (error) {
		console.lo
	}
	phoneAlarm.printAlarms();

	phoneAlarm.addClock('22:02', () => {
		console.log('Вставай а то проспишь!');
		phoneAlarm.clearAlarms();
		phoneAlarm.printAlarms();
	}, 3);
	phoneAlarm.addClock('21:15', () => { console.log('Пора вставать, а то проспишь') }, 1);

}

testCase();