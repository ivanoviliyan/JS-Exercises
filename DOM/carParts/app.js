window.addEventListener('load', solve);

function solve() {
	const inputs = {
		model: document.querySelector('#car-model'),
		year: document.querySelector('#car-year'),
		name: document.querySelector('#part-name'),
		number: document.querySelector('#part-number'),
		condition: document.querySelector('#condition'),
	};
	const nextButton = document.querySelector('#next-btn');
	const infoList = document.querySelector('.info-list');
	const completeImg = document.querySelector('#complete-img');
	const completeText = document.querySelector('#complete-text');
	const confirmList = document.querySelector('.confirm-list');

	nextButton.addEventListener('click', onNext);
	function onNext(e) {
		e.preventDefault();
		const inputValues = Object.values(inputs);
		const empty = inputValues.find((el) => el.value === '');
		if (empty) {
			console.log('empty field');
			return;
		}

		if (Number(inputs.year.value) < 1980 || Number(inputs.year.value) > 2023) {
			console.log('Wrong year');
			return;
		}

		const listItem = create(inputValues);
		infoList.appendChild(listItem);
		completeImg.style.visibility = 'hidden';
		completeText.textContent = '';

		inputValues.forEach((el) => (el.value = ''));
		e.target.disabled = true;
	}
	function create(data) {
		let [model, year, name, number, condition] = data;
		const save = {
			m: model.value,
			y: year.value,
			n: name.value,
			num: number.value,
			c: condition.value,
		};

		const li = document.createElement('li');
		li.classList.add('part-content');

		const article = document.createElement('article');

		const pModel = document.createElement('p');
		pModel.textContent = `Car Model: ${model.value}`;

		const pYear = document.createElement('p');
		pYear.textContent = `Car Year: ${year.value}`;

		const pName = document.createElement('p');
		pName.textContent = `Part Name: ${name.value}`;

		const pNumber = document.createElement('p');
		pNumber.textContent = `Part Number: ${number.value}`;

		const pCondition = document.createElement('p');
		pCondition.textContent = `Condition: ${condition.value}`;

		const editButton = document.createElement('button');
		editButton.textContent = 'Edit';
		editButton.classList.add('edit-btn');
		editButton.addEventListener('click', (e) => {
			inputs.model.value = save.m;
			inputs.year.value = save.y;
			inputs.name.value = save.n;
			inputs.number.value = save.num;
			inputs.condition.value = save.c;

			const parentEl = e.target.parentElement;
			parentEl.remove();

			nextButton.disabled = false;
		});

		const continueButton = document.createElement('button');
		continueButton.textContent = 'Continue';
		continueButton.classList.add('continue-btn');
		continueButton.addEventListener('click', (e) => {
			const li = document.createElement('li');
			li.classList.add('part-content');

			const article = e.target.previousSibling.previousSibling;

			const confirmButton = document.createElement('button');
			confirmButton.textContent = 'Confirm';
			confirmButton.classList.add('confirm-btn');
			confirmButton.addEventListener('click', (e) => {
				e.target.parentElement.remove();
				nextButton.disabled = false;
				completeImg.style.visibility = 'visible';
				completeText.textContent = 'Part is Ordered!';
			});

			const cancelButton = document.createElement('button');
			cancelButton.textContent = 'Cancel';
			cancelButton.classList.add('cancel-btn');
			cancelButton.addEventListener('click', (e) => {
				e.target.parentElement.remove();
				nextButton.disabled = false;
			});

			li.appendChild(article);
			li.appendChild(confirmButton);
			li.appendChild(cancelButton);

			confirmList.appendChild(li);

			e.target.parentElement.remove();
		});

		article.appendChild(pModel);
		article.appendChild(pYear);
		article.appendChild(pName);
		article.appendChild(pNumber);
		article.appendChild(pCondition);
		li.appendChild(article);
		li.appendChild(editButton);
		li.appendChild(continueButton);

		return li;
	}
}
