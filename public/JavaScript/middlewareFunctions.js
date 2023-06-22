
export function checkAndUpdateStatus(row) {

	const statusElement = row.querySelector('#status');

	const departureTimeValue = row.querySelector('#departuretime #time-value');

	if(departureTimeValue.innerHTML === "-") {

		statusElement.classList.value = 'status in-progress';

		statusElement.innerHTML = 'in-progress';

	} else {

		statusElement.classList.value = 'status completed';

		statusElement.innerHTML = 'completed';
	};
};