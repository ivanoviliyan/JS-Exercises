class JobOffers {
	constructor(employer, position) {
		this.employer = employer;
		this.position = position;
		this.jobCandidates = [];
	}
	//arr of strings
	jobApplication(candidates) {
		const result = [];
		candidates.forEach((el) => {
			let [name, education, yearExperience] = el.split('-');
			const candidat = {
				name,
				education,
				yearExperience,
			};
			const curr = this.jobCandidates.find((x) => x.name === name);
			if (curr) {
				if (curr.yearExperience < yearExperience) {
					curr.yearExperience = yearExperience;
				}
			} else {
				result.push(name);
				this.jobCandidates.push(candidat);
			}
		});

		return `You successfully added candidates: ${result.join(', ')}.`;
	}
	jobOffer(chosenPerson) {
		let [name, minimalExperience] = chosenPerson.split('-');
		minimalExperience = Number(minimalExperience);
		const curr = this.jobCandidates.find((x) => x.name === name);
		if (!curr) {
			throw new Error(`${name} is not in the candidates list!`);
		}
		if (minimalExperience > curr.yearExperience) {
			throw new Error(
				`${name} does not have enough experience as ${this.position}, minimum requirement is ${minimalExperience} years.`
			);
		}

		curr.yearExperience = 'hired';
		return `Welcome aboard, our newest employee is ${name}.`;
	}
	salaryBonus(name) {
		const curr = this.jobCandidates.find((x) => x.name === name);
		if (!curr) {
			throw new Error(`${name} is not in the candidates list!`);
		}

		if (curr.education === 'Bachelor') {
			return `${name} will sign a contract for ${this.employer}, as ${this.position} with a salary of $50,000 per year!`;
		}
		if (curr.education === 'Master') {
			return `${name} will sign a contract for ${this.employer}, as ${this.position} with a salary of $60,000 per year!`;
		}

		return `${name} will sign a contract for ${this.employer}, as ${this.position} with a salary of $40,000 per year!`;
	}
	candidatesDatabase() {
		if (this.jobCandidates.length === 0) {
			throw new Error('Candidate Database is empty!');
		}
		const sorted = this.jobCandidates.sort((a, b) =>
			a.name.localeCompare(b.name)
		);
		const result = [];
		result.push('Candidates list:');
		sorted.forEach((el) => {
			result.push(`${el.name}-${el.yearExperience}`);
		});

		return result.join('\n');
	}
}
let Jobs = new JobOffers('Google', 'Strategy Analyst');
console.log(
	Jobs.jobApplication([
		'John Doe-Bachelor-10',
		'Peter Parker-Master-5',
		'Jordan Cole-High School-5',
		'Daniel Jones- Bachelor-18',
	])
);
console.log(Jobs.jobOffer('John Doe-8'));
console.log(Jobs.jobOffer('Peter Parker-4'));
console.log(Jobs.jobOffer('Jordan Cole-4'));
console.log(Jobs.salaryBonus('Jordan Cole'));
console.log(Jobs.salaryBonus('John Doe'));
console.log(Jobs.candidatesDatabase());
