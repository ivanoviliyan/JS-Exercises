window.addEventListener('load', solve);

function solve() {
	const inputs = {
		firstNameEl: document.querySelector('#first-name'),
		lastNameEl: document.querySelector('#last-name'),
		dateInEl: document.querySelector('#date-in'),
		dateOutEl: document.querySelector('#date-out'),
		countEl: document.querySelector('#people-count'),
	};
	const nextBtnEl = document.querySelector('#next-btn');
	const infoListEl = document.querySelector('.info-list');
	const confirmListEl = document.querySelector('.confirm-list');
	const verification = document.querySelector('#verification');

	nextBtnEl.addEventListener('click', onNext);
	function onNext(e) {
		e.preventDefault();
		const isEmpty = Object.values(inputs).find((input) => input.value === '');
		const dateIn = new Date(inputs.dateInEl.value);
		const dateOut = new Date(inputs.dateOutEl.value);
		if (isEmpty || dateIn >= dateOut) {
			return;
		}

		const reservation = createReservation(Object.values(inputs));
		Object.values(inputs).forEach((el) => (el.value = ''));

		infoListEl.appendChild(reservation.li);

		reservation.editBtn.addEventListener('click', (e) => {
			inputs.firstNameEl.value = reservation.data.firstName;
			inputs.lastNameEl.value = reservation.data.lastName;
			inputs.dateInEl.value = reservation.data.dateIn;
			inputs.dateOutEl.value = reservation.data.dateOut;
			inputs.countEl.value = reservation.data.count;

			e.target.parentElement.remove();
			nextBtnEl.disabled = false;
		});
		reservation.continueBtn.addEventListener('click', (e) => {
			const li = document.createElement('li');
			const confirmBtn = document.createElement('button');
			confirmBtn.textContent = 'Confirm';
			confirmBtn.classList.add('confirm-btn');
			confirmBtn.addEventListener('click', (e) => {
				verification.textContent = 'Confirmed.';
				verification.className = 'reservation-confirmed';
				e.target.parentElement.remove();
				nextBtnEl.disabled = false;
			});

			const cancelBtn = document.createElement('button');
			cancelBtn.textContent = 'Cancel';
			cancelBtn.classList.add('cancel-btn');
			cancelBtn.addEventListener('click', (e) => {
				verification.textContent = 'Cancelled.';
				verification.className = 'reservation-cancelled';
				e.target.parentElement.remove();
				nextBtnEl.disabled = false;
			});

			li.appendChild(reservation.article);
			li.appendChild(confirmBtn);
			li.appendChild(cancelBtn);
			confirmListEl.appendChild(li);

			reservation.li.remove();
		});

		nextBtnEl.disabled = true;
	}

	function createReservation([
		firstNameEl,
		lastNameEl,
		dateInEl,
		dateOutEl,
		countEl,
	]) {
		const data = {
			firstName: firstNameEl.value,
			lastName: lastNameEl.value,
			dateIn: dateInEl.value,
			dateOut: dateOutEl.value,
			count: countEl.value,
		};

		const name = `Name: ${firstNameEl.value} ${lastNameEl.value}`;
		const dateIn = `From date: ${dateInEl.value}`;
		const dateOut = `To date: ${dateOutEl.value}`;
		const people = `For ${countEl.value} people`;

		const li = document.createElement('li');
		li.classList.add('reservation-content');
		const article = document.createElement('article');
		const h3 = document.createElement('h3');
		h3.textContent = name;
		const dateInP = document.createElement('p');
		dateInP.textContent = dateIn;
		const dateOutP = document.createElement('p');
		dateOutP.textContent = dateOut;
		const peopleP = document.createElement('p');
		peopleP.textContent = people;
		const editBtn = document.createElement('button');
		editBtn.classList.add('edit-btn');
		editBtn.textContent = 'Edit';
		const continueBtn = document.createElement('button');
		continueBtn.classList.add('continue-btn');
		continueBtn.textContent = 'Continue';

		article.appendChild(h3);
		article.appendChild(dateInP);
		article.appendChild(dateOutP);
		article.appendChild(peopleP);
		li.appendChild(article);
		li.appendChild(editBtn);
		li.appendChild(continueBtn);

		return { li, article, editBtn, continueBtn, data };
	}
}
