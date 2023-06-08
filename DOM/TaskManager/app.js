function solve() {
	//? capture elements
	const addBtn = document.querySelector('#add');
	const taskInput = document.querySelector('#task');
	const descriptionTextArea = document.querySelector('#description');
	const dateInput = document.querySelector('#date');
	const openDiv =
		document.querySelector('.orange').parentElement.nextElementSibling;
	const progressDiv =
		document.querySelector('.yellow').parentElement.nextElementSibling;
	const completeDiv =
		document.querySelector('.green').parentElement.nextElementSibling;

	function addTask(e) {
		e.preventDefault();
		let task = taskInput.value;
		let desc = descriptionTextArea.value;
		let date = dateInput.value;

		if (task && desc && date) {
			const article = document.createElement('article');

			const h3 = document.createElement('h3');
			h3.textContent = task;

			const firstP = document.createElement('p');
			firstP.textContent = `Description: ${desc}`;

			const secondP = document.createElement('p');
			secondP.textContent = `Due Date: ${date}`;

			//? div
			const div = document.createElement('div');
			div.classList.add('flex');
			const startBtn = document.createElement('button');
			startBtn.classList.add('green');
			startBtn.textContent = 'Start';
			startBtn.addEventListener('click', (e) => {
				progressDiv.appendChild(article);
				startBtn.remove();
				const finishBtn = document.createElement('button');
				finishBtn.classList.add('orange');
				finishBtn.textContent = 'Finish';
				div.appendChild(finishBtn);
				finishBtn.addEventListener('click', () => {
					deleteBtn.remove();
					finishBtn.remove();
					completeDiv.appendChild(article);
				});
			});

			const deleteBtn = document.createElement('button');
			deleteBtn.classList.add('red');
			deleteBtn.textContent = 'Delete';
			deleteBtn.addEventListener('click', () => {
				article.remove();
			});

			div.appendChild(startBtn);
			div.appendChild(deleteBtn);

			//? article
			article.appendChild(h3);
			article.appendChild(firstP);
			article.appendChild(secondP);
			article.appendChild(div);

			//? finally
			openDiv.appendChild(article);

			taskInput.value = '';
			descriptionTextArea.value = '';
			dateInput.value = '';
		}
	}

	addBtn.addEventListener('click', addTask);
}
