function Student(name, gender, age) {
	this.name = name;
	this.gender = gender;
	this.age = age
}

Student.prototype.setSubject = function (subjectName) {
	this.subject = subjectName;
}

Student.prototype.addMark = function (mark) {
	if (this.marks === undefined) {
		this.marks = [];
	}
	this.marks.push(mark);
}

Student.prototype.addMarks = function (...marks) {
	if (this.marks === undefined) {
		this.marks = [];
	}
	marks.forEach(element => {
		this.marks.push(element);
	});
}

Student.prototype.getAverage = function () {
	if (this.marks === undefined) {
		return 0;
	}
	let result = 0;
	this.marks.forEach(element => {
		result += element;
	});

	// Округление до 2 зн после запятой =)
	// result = +(result / this.marks.length).toFixed(2); 

	return result / this.marks.length;
}

Student.prototype.exclude = function (reason) {
	delete this['subject'];
	delete this['marks'];

	this.excluded = reason;
}