function solve() {
	const stopInfoElem = document.querySelector('.info');
	const departBtn = document.querySelector('#depart');
	const arriveBtn = document.querySelector('#arrive');

	let nextStopId = 'depot';
	let stopName = '';

	async function depart() {
		try {
			const response = await fetch(
				`http://localhost:3030/jsonstore/bus/schedule/${nextStopId}`
			);

			if (!response.ok) {
				const error = new Error();
				error.message = 'Error';
				error.status = response.status;

				throw error;
			}

			const data = await response.json();

			stopName = data.name;
			nextStopId = data.next;

			stopInfoElem.textContent = `Next stop ${stopName}`;

			departBtn.disabled = true;
			arriveBtn.disabled = false;
		} catch (error) {
			stopInfoElem.textContent = 'Error';
			departBtn.disabled = true;
			arriveBtn.disabled = true;
		}
	}

	function arrive() {
		stopInfoElem.textContent = `Arriving at ${stopName}`;

		departBtn.disabled = false;
		arriveBtn.disabled = true;
	}

	return {
		depart,
		arrive,
	};
}

let result = solve();
