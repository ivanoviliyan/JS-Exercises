function lockedProfile() {
	const buttons = Array.from(document.querySelectorAll('div button'));

	buttons.forEach((element) => {
		element.addEventListener('click', onClick);
	});

	function onClick(e) {
		const currentButton = e.target;
		const hiddenData = currentButton.previousElementSibling;
		const parentElement = currentButton.parentElement;
		const isLocked = parentElement.querySelector('input').checked;
		if (isLocked) {
			return;
		}
		if (!hiddenData.style.display) {
			hiddenData.style.display = 'inline';
			currentButton.textContent = 'Hide it';
			return;
		}
		hiddenData.style.display = 'none';
		currentButton.textContent = 'Show more';
	}
}
