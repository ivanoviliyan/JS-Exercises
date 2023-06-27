async function getInfo() {
	const stopId = document.querySelector('#stopId').value;
	const buses = document.querySelector('#buses');
	buses.innerHTML = '';
	const stopName = document.querySelector('#stopName');

	const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(response.statusText);
		}

		const data = await response.json();

		stopName.textContent = data.name;

		Object.entries(data.buses).forEach(([busId, time]) => {
			const li = document.createElement('li');
			li.textContent = `Bus ${busId} arrives in ${time} minutes`;
			buses.appendChild(li);
		});
	} catch (error) {
		stopName.textContent = 'Error';
	}
}
