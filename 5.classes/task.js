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
				this.subjects.forEach(element => {
					if (element.name === subject) {
						element.addSubjectMark(subject, mark);
					} else {
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
		this.subjects.forEach((subject) => {				// Для каждого объекта Subject
			if (subject.name === subjectName) {					// Поле имя темы === выбранное имя
				let markSum = 0;
				subject.marks.forEach(mark => {
					markSum += mark;
					// console.log(markSum);
				});
				this.averageSubject = markSum / subject.marks.length;
				console.log(this.averageSubject); //Тут значение есть
				return this.averageSubject;	// Тут значение возвращается, а в месте вызова функции у меня undefined 
			}
			return "Несуществующий предмет";
		});
	}
}

class Subject {
	constructor(subjectName, subjectMark) {
		this.name = subjectName;
		this.marks = []
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

const s = new Student('vasya');
s.addMark(5, 'biology');
s.addMark(4, 'biology');
s.addMark(3, 'biology');
// console.log(s.subjects[0].marks);
// console.log("=========================================================");
console.log(s.getAverageBySubject('biology'));		// При вызове получаю undefined, хотя в самой функцие переменная имеет значение. Не понимаю
// console.log("=========================================================");
