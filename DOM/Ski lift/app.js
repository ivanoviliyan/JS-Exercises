window.addEventListener('load', solve);

function solve() {
	//*capture elements
	const formData = {
		firstName: document.querySelector('#first-name'),
		lastName: document.querySelector('#last-name'),
		numberOfPerople: document.querySelector('#people-count'),
		fromDate: document.querySelector('#from-date'),
		daysCount: document.querySelector('#days-count'),
	};
	const nextStepBtn = document.querySelector('#next-btn');
	const ticketInfoList = document.querySelector('.ticket-info-list');
	const confirmTicketList = document.querySelector('.confirm-ticket');

	//* Add handlers to the button
	nextStepBtn.addEventListener('click', nextStepBtnHandler);

	//* Helper functions()
	function createTicket(data) {
		//*handle data
		const name = `Name: ${data[0].value} ${data[1].value}`;
		const date = `From date: ${data[3].value}`;
		const days = `For ${data[4].value} days`;
		const people = `For ${data[2].value} people`;

		//*create
		const li = document.createElement('li');
		const article = document.createElement('article');
		const h3 = document.createElement('h3');
		const dateParagraph = document.createElement('p');
		const daysParagraph = document.createElement('p');
		const peopleParagraph = document.createElement('p');
		const editBtn = document.createElement('button');
		const continueBtn = document.createElement('button');

		//*add properties
		li.classList.add('ticket');
		h3.textContent = name;
		dateParagraph.textContent = date;
		daysParagraph.textContent = days;
		peopleParagraph.textContent = people;
		editBtn.classList.add('edit-btn');
		editBtn.textContent = 'Edit';
		editBtn.addEventListener('click', editBtnHandler);
		continueBtn.classList.add('continue-btn');
		continueBtn.textContent = 'Continue';
		continueBtn.addEventListener('click', continueBtnHandler);

		//*attach
		article.appendChild(h3);
		article.appendChild(dateParagraph);
		article.appendChild(daysParagraph);
		article.appendChild(peopleParagraph);
		li.appendChild(article);
		li.appendChild(editBtn);
		li.appendChild(continueBtn);

		return li;
	}

	//*ticketStorage

	//* Event handlers
	function nextStepBtnHandler(e) {
		e.preventDefault();
		//data validation
		const data = Object.values(formData);
		const emptyInputField = data.find((input) => input.value === '');
		if (emptyInputField) {
			console.log('Empty filed detected!');
			return;
		}
		//attach new ticket
		const ticket = createTicket(data);
		ticketInfoList.appendChild(ticket);
		//clear inputs
		data.forEach((input) => (input.value = ''));
		//disable nextBtn
		e.target.disabled = true;
	}
	function editBtnHandler(e) {
		const li = e.target.parentElement;
		const article = e.target.previousSibling;
		const data = Array.from(article.children);
		const name = data[0].textContent.substring(6);
		const firstName = name.split(' ')[0];
		const lastName = name.split(' ')[1];
		const dateParts = data[1].textContent.substring(10).split('-');
		const yy = dateParts[0].trim();
		const mm = dateParts[1].trim();
		const dd = dateParts[2].trim();

		const days = data[2].textContent.split(' ')[1];
		const people = data[3].textContent.split(' ')[1];

		formData.firstName.value = firstName;
		formData.lastName.value = lastName;
		formData.fromDate.value = `${yy}-${mm}-${dd}`;
		formData.daysCount.value = days;
		formData.numberOfPerople.value = people;

		li.remove();
		nextStepBtn.disabled = false;
	}
	function continueBtnHandler(e) {
		const li = document.createElement('li');

		const article = ticketInfoList.querySelector(
			'.ticket > article:nth-child(1)'
		);
		const confirmBtn = document.createElement('button');
		const cancelBtn = document.createElement('button');

		li.classList.add('ticket-content');
		confirmBtn.classList.add('confirm-btn');
		confirmBtn.textContent = 'Confirm';
		confirmBtn.addEventListener('click', confirmBtnHandler);
		cancelBtn.classList.add('cancel-btn');
		cancelBtn.textContent = 'Cancel';
		cancelBtn.addEventListener('click', cancelBtnHandler);

		li.appendChild(article);
		li.appendChild(confirmBtn);
		li.appendChild(cancelBtn);
		confirmTicketList.appendChild(li);

		const removeLi = e.target.parentElement;
		removeLi.remove();
	}
	function confirmBtnHandler(e) {
		const main = document.querySelector('#main');
		main.remove();
		const body = document.querySelector('#body');
		const h1 = document.createElement('h1');
		h1.id = 'thank-you';
		h1.textContent = 'Thank you, have a nice day!';
		const btn = document.createElement('button');
		btn.id = 'back-btn';
		btn.textContent = 'Back ';
		btn.addEventListener('click', () => window.location.reload());

		body.appendChild(h1);
		body.appendChild(btn);
	}
	function cancelBtnHandler(e) {
		const li = e.target.parentElement;
		li.remove();
		nextStepBtn.disabled = false;
	}
}
