function addItem() {
	const itemValue = document.querySelector('#newItemValue');
	const itemText = document.querySelector('#newItemText');
	const menu = document.querySelector('#menu');

	const optionElement = document.createElement('option');

	optionElement.textContent = itemText.value;
	optionElement.value = itemValue.value;

	menu.appendChild(optionElement);

	itemValue.value = '';
	itemText.value = '';
}
