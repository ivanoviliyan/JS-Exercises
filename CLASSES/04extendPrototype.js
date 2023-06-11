function extendProrotype(classToExtend) {
	// TODO:
	classToExtend.prototype.species = 'Human';

	classToExtend.prototype.toSpeciesString = function () {
		return `I am a ${this.species}. ${this.toString()}`;
	};

	return classToExtend;
}
class Person {
	constructor(name, email) {
		this.name = name;
		this.email = email;
	}
	toString() {
		return `Person (name: ${this.name}, email: ${this.email})`;
	}
}

extendProrotype(Person);
let p = new Person('Pesho', 'email@hit.bg');
console.log(p.species);
console.log(p.toSpeciesString());
