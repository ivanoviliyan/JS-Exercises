window.addEventListener('load', solve);

function solve() {
	const authorInfo = {
		firstName: document.querySelector('#first-name'),
		lastName: document.querySelector('#last-name'),
		age: document.querySelector('#age'),
		storyTitle: document.querySelector('#story-title'),
		genre: document.querySelector('#genre'),
		story: document.querySelector('#story'),
	};

	const publishBtn = document.querySelector('#form-btn');
	const previewListUl = document.querySelector('#preview-list');
	let savedData = {};

	function createPreview() {
		//savedData
		const data = {
			f: authorInfo.firstName.value,
			l: authorInfo.lastName.value,
			a: authorInfo.age.value,
			storyT: authorInfo.storyTitle.value,
			g: authorInfo.genre.value,
			s: authorInfo.story.value,
		};
		savedData = data;
		//Create
		const li = document.createElement('li');
		const article = document.createElement('article');
		const h4 = document.createElement('h4');
		const ageP = document.createElement('p');
		const titleP = document.createElement('p');
		const genreP = document.createElement('p');
		const storyP = document.createElement('p');
		const saveBtn = document.createElement('button');
		const editBtn = document.createElement('button');
		const deleteBtn = document.createElement('button');

		//Modify
		li.classList.add('story-info');
		h4.textContent = `Name: ${authorInfo.firstName.value} ${authorInfo.lastName.value}`;
		ageP.textContent = `Age: ${authorInfo.age.value}`;
		titleP.textContent = `Title: ${authorInfo.storyTitle.value}`;
		genreP.textContent = `Genre: ${authorInfo.genre.value}`;
		storyP.textContent = `${authorInfo.story.value}`;
		saveBtn.textContent = 'Save Story';
		editBtn.textContent = 'Edit Story';
		deleteBtn.textContent = 'Delete Story';
		saveBtn.classList.add('save-btn');
		editBtn.classList.add('edit-btn');
		deleteBtn.classList.add('delete-btn');

		//Attach
		article.appendChild(h4);
		article.appendChild(ageP);
		article.appendChild(titleP);
		article.appendChild(genreP);
		article.appendChild(storyP);
		li.appendChild(article);
		li.appendChild(saveBtn);
		li.appendChild(editBtn);
		li.appendChild(deleteBtn);

		return { li, saveBtn, editBtn, deleteBtn, data };
	}

	publishBtn.addEventListener('click', onPublish);
	function onPublish(e) {
		e.preventDefault();
		const data = Object.values(authorInfo);
		const isEmpty = data.find((element) => element.value === '');
		if (isEmpty) {
			return;
		}

		const previewLi = createPreview();
		previewListUl.appendChild(previewLi.li);
		previewLi.editBtn.addEventListener('click', onEdit);
		previewLi.saveBtn.addEventListener('click', onSave);
		previewLi.deleteBtn.addEventListener('click', onDelete);

		data.forEach((el) => (el.value = ''));
		e.target.disabled = true;
	}

	function onEdit(e) {
		authorInfo.firstName.value = savedData.f;
		authorInfo.lastName.value = savedData.l;
		authorInfo.age.value = savedData.a;
		authorInfo.storyTitle.value = savedData.storyT;
		authorInfo.genre.value = savedData.g;
		authorInfo.story.value = savedData.s;

		const parent = e.target.parentElement;
		parent.remove();
		publishBtn.disabled = false;
	}
	function onSave(e) {
		const removeMain = document.querySelector('#main');
		removeMain.remove();

		const body = document.querySelector('.body');
		const div = document.createElement('div');
		const h1 = document.createElement('h1');

		div.id = 'main';
		h1.textContent = 'Your scary story is saved!';

		div.appendChild(h1);
		body.appendChild(div);
	}
	function onDelete(e) {
		const parent = e.target.parentElement;
		parent.remove();
		publishBtn.disabled = false;
	}
}
