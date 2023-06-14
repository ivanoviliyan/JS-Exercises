window.addEventListener('load', solve);

function solve() {
	//!Capture elements
	//Form
	const form = {
		name: document.getElementById('gem-name'),
		color: document.getElementById('color'),
		carats: document.getElementById('carats'),
		price: document.getElementById('price'),
		type: document.getElementById('type'),
	};
	//Pannels
	const pannels = {
		preview: document.getElementById('preview-list'),
		collection: document.getElementById('collection'),
	};
	//Button
	const addGemBtn = document.getElementById('add-btn');
	addGemBtn.addEventListener('click', addGemBtnHandler);

	//! Handlers
	function addGemBtnHandler(e) {
		e.preventDefault();
		const data = Object.values(form);
		const isEmptyField = data.find((entry) => entry.value === '');
		if (isEmptyField) {
			return;
		}
		const li = createListItem(data);
		pannels.preview.appendChild(li);
		e.target.disabled = true;

		data.forEach((entry) => (entry.value = ''));
	}
	function editBtnHandler(e) {
		const parent = e.target.parentElement;
		const data = Array.from(e.target.parentElement.firstChild.children);
		const name = data[0].textContent;
		const color = data[1].textContent.substring(7);
		const carats = data[2].textContent.substring(8);
		const price = data[3].textContent.substring(7);
		const type = data[4].textContent.substring(6);

		form.name.value = name;
		form.color.value = color;
		form.carats.value = carats;
		form.price.value = price;
		form.type.value = type;

		parent.remove();
		addGemBtn.disabled = false;
	}
	function saveBtnHandler(e) {
		const data = Array.from(e.target.previousSibling.children);
		const li = createCollectionItem(data);
		pannels.collection.appendChild(li);
		const parent = e.target.parentElement;
		parent.remove();
		addGemBtn.disabled = false;
	}
	function cancelBtnHandler(e) {
		const parent = e.target.parentElement;
		parent.remove();
		addGemBtn.disabled = false;
	}

	//! Functions
	function createListItem([name, color, carats, price, type]) {
		const li = document.createElement('li');
		li.classList.add('gem-info');

		const article = document.createElement('article');

		const h4 = document.createElement('h4');
		h4.textContent = name.value;

		const colorParagraph = document.createElement('p');
		colorParagraph.textContent = `Color: ${color.value}`;

		const caratsParagraph = document.createElement('p');
		caratsParagraph.textContent = `Carats: ${carats.value}`;

		const priceParagraph = document.createElement('p');
		priceParagraph.textContent = `Price: ${price.value}`;

		const typeParagraph = document.createElement('p');
		typeParagraph.textContent = `Type: ${type.value}`;

		article.appendChild(h4);
		article.appendChild(colorParagraph);
		article.appendChild(caratsParagraph);
		article.appendChild(priceParagraph);
		article.appendChild(typeParagraph);

		const saveBtn = document.createElement('button');
		saveBtn.classList.add('save-btn');
		saveBtn.textContent = 'Save to Collection';
		saveBtn.addEventListener('click', saveBtnHandler);

		const editBtn = document.createElement('button');
		editBtn.classList.add('edit-btn');
		editBtn.textContent = 'Edit Information';
		editBtn.addEventListener('click', editBtnHandler);

		const cancelBtn = document.createElement('button');
		cancelBtn.classList.add('cancel-btn');
		cancelBtn.textContent = 'Cancel';
		cancelBtn.addEventListener('click', cancelBtnHandler);

		li.appendChild(article);
		li.appendChild(saveBtn);
		li.appendChild(editBtn);
		li.appendChild(cancelBtn);

		return li;
	}
	function createCollectionItem(data) {
		const name = data[0].textContent;
		const color = data[1].textContent.substring(7);
		const carats = data[2].textContent.substring(8);
		const price = data[3].textContent.substring(7);
		const type = data[4].textContent.substring(6);

		console.log(name, color, carats, price, type);

		const li = document.createElement('li');
		const paragraph = document.createElement('p');
		paragraph.classList.add('collection-item');
		paragraph.textContent = `${name} - Color: ${color}/ Carats: ${carats}/ Price: ${price}$/ Type: ${type}`;
		li.appendChild(paragraph);

		return li;
	}
}
