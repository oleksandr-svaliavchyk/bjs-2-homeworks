class PrintEditionItem {
	constructor(name, releaseDate, pagesCount) {
		this.name = name;
		this.releaseDate = releaseDate;
		this.pagesCount = pagesCount;
		this._state = 100;
		this.type = null;
	}

	fix() {
		if (this.state > 0) {
			this._state *= 1.5;
			this._state > 100 ? this.state = 100 : this.state;
		}
	}

	set state(state) {
		state < 0 ? this._state = 0 : state > 100 ? this._state = 100 : this._state = state;
	}

	get state() {
		return this._state;
	}
}

class Magazine extends PrintEditionItem {
	constructor(name, releaseDate, pagesCount) {
		super(name, releaseDate, pagesCount);
		this.type = "magazine";
	}
}

class Book extends PrintEditionItem {
	constructor(author, name, releaseDate, pagesCount) {
		super(name, releaseDate, pagesCount);
		this.author = author;
		this.type = "book";
	}
}

class NovelBook extends Book {
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "novel";
	}
}

class FantasticBook extends Book {
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "fantastic";
	}
}
class DetectiveBook extends Book {
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "detective";
	}
}


class Library {
	constructor(name) {
		this.name = name;
		this.books = [];
	}

	addBook(book) {
		if (book.state > 30) {
			this.books.push(book);
		}
	}

	findBookBy(type, value) {
		for (let i = 0; i < this.books.length; i++) {
			for (let key in this.books[i]) {
				if (key === type) {
					if (this.books[i][key] === value) {
						return this.books[i];
					}
				}
			}
		}
		return null;
	}

	giveBookByName(bookName) {
		let resultFind = null;
		this.books.forEach((element, idx) => {
			if (element.name === bookName) {
				resultFind = (this.books.splice(idx, 1))[0];
				return resultFind;
			}
		});
		return resultFind;
	}
}



//============================ Задача 3
class Student {
	constructor(name) {
		this.name = name;
		this.subjects = []; // Массив объектов Subject
		this.averageSubject = 0;
	}

	addMark(mark, subject) {
		if ((mark > 0) && (mark < 6)) {
			if (this.subjects.length > 0) {
				this.subjects.forEach((element, idx) => {
					if (element.name === subject) {
						element.addSubjectMark(subject, mark);
					} else if (idx === this.subjects.length - 1) {
						subject = new Subject(subject, mark);
						this.subjects.push(subject);		// Создаю и кидаю в массив объект "Предмет,"
					}
				});
			} else {
				subject = new Subject(subject, mark);
				this.subjects.push(subject);		// Создаю и кидаю в массив объект "Предмет,"
			}
		}
		else {
			return ("Ошибка, оценка должна быть числом от 1 до 5");
		}

	}

	getAverageBySubject(subjectName) {
		this.averageSubject = "Несуществующий предмет";
		this.subjects.forEach((subject) => {				// Для каждого объекта Subject (у студента есть массив предметов (это экземпляры класса "Предмет"))
			if (subject.name === subjectName) {					// Поле имя предмета === выбранное имя предмета, по которому выбрать оценки
				let markSum = 0;										// Сума оценок
				subject.marks.forEach(mark => {					// Для каждой оценки
					markSum += mark;									// добавить в суму
				});
				this.averageSubject = markSum / subject.marks.length;		//ср значение. Записывал как сейчас, и пробовал в перевенную let result; , разницы нет
				// return this.averageSubject;	// Тут значение возвращается, а в месте вызова функции у меня undefined, почему ? Разве я не могу ретурн сделать где хочу?
			}
			// return this.averageSubject; Тут так же возвращает андеф.
		});
		return this.averageSubject;
	}

	getAverage() {
		let sum = 0, amount = 0, count = 0;
		this.subjects.forEach(element => {
			element.marks.forEach(mark => {
				// console.log("mark" + (count++), +" " + mark)
				sum += mark;
				amount++;
			});
		});

		return sum / amount;
	}
}

class Subject {
	constructor(subjectName, subjectMark) {
		this.name = subjectName;
		this.marks = [];

		if (!(subjectName === undefined)) {
			this.marks.push(subjectMark);
		}
	}

	addSubjectMark(subjectName, subjectMark) {
		if (!(subjectName === undefined)) {
			this.marks.push(subjectMark);
		}
	}

}