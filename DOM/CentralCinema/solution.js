function solve() {
	const onScreenBtn = document.querySelector('#container').children[3];
	const moviesUl = document.querySelector('#movies>ul');
	const archiveDivUl = document.querySelector('#archive>ul');

	onScreenBtn.addEventListener('click', addOnScreen);

	function addOnScreen(e) {
		e.preventDefault();
		const inputs = Array.from(
			document.querySelectorAll('#container>input[type="text"]')
		);
		const name = inputs[0].value;
		const hall = inputs[1].value;
		const ticketPrice = Number(inputs[2].value);

		if (name && hall && ticketPrice && !isNaN(ticketPrice) && ticketPrice > 0) {
			createLi(name, hall, ticketPrice);
			clearInputs(inputs);
		}
	}

	function createLi(name, hall, ticketPrice) {
		const li = document.createElement('li');

		const liSpan = document.createElement('span');
		liSpan.textContent = name;
		const liStrong = document.createElement('strong');
		liStrong.textContent = `Hall: ${hall}`;
		const liDiv = document.createElement('div');

		const liDivStrong = document.createElement('strong');
		liDivStrong.textContent = ticketPrice.toFixed(2);
		const liDivInput = document.createElement('input');
		liDivInput.placeholder = 'Tickets Sold';
		const liDivButton = document.createElement('button');
		liDivButton.textContent = 'Archive';
		liDivButton.addEventListener('click', addToArchive);

		liDiv.appendChild(liDivStrong);
		liDiv.appendChild(liDivInput);
		liDiv.appendChild(liDivButton);

		li.appendChild(liSpan);
		li.appendChild(liStrong);
		li.appendChild(liDiv);

		moviesUl.appendChild(li);
	}

	function addToArchive() {
		const ticketSoldCount = Number(
			this.parentElement.querySelector('input').value
		);

		if (!ticketSoldCount || ticketSoldCount <= 0) {
			return;
		}

		const ticketPrice = Number(
			this.parentElement.querySelector('strong').textContent
		);

		const total = (ticketPrice * ticketSoldCount).toFixed(2);
		const name =
			this.parentElement.parentElement.querySelector('span').textContent;

		createArchiveLi(name, total);
		clearInputs(this.parentElement.querySelectorAll('input'));

		function createArchiveLi(name, totalAmount) {
			const li = document.createElement('li');
			const span = document.createElement('span');
			span.textContent = name;
			const strong = document.createElement('strong');
			strong.textContent = `Total amount: ${totalAmount}`;
			const button = document.createElement('button');
			button.textContent = 'Delete';
			button.addEventListener('click', () => {
				li.remove();
			});

			li.appendChild(span);
			li.appendChild(strong);
			li.appendChild(button);

			archiveDivUl.appendChild(li);
		}
	}

	function clearInputs(inputs) {
		inputs.forEach((input) => {
			input.value = '';
		});
	}

	moviesUl.addEventListener('click', (e) => {
		e.preventDefault();
		const input = e.target.previousElementSibling;
		if (e.target.textContent === 'Archive' && input.value !== '') {
			const ticketSoldCount = Number(input.value);
			if (ticketSoldCount > 0) {
				e.target.parentElement.parentElement.remove();
			}
		}
	});

	const clearBtn = document.querySelector('#archive>button');

	clearBtn.addEventListener('click', (e) => {
		e.preventDefault();
		archiveDivUl.innerHTML = '';
	});
}
