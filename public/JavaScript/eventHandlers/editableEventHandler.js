


export function enteringEditableState(e) {

	const row = e.target;

	const couriercompany 	= row.querySelector('#couriercompany');
	const cargo 			= row.querySelector('#cargo');
	const arrivaltime		= row.querySelector('#arrivaltime #time-value')
	const departuretime 	= row.querySelector('#arrivaltime #time-value')
	const gate 				= row.querySelector('#gate #gate-value');

	console.log(arrivaltime)
	

	const config = {
		childList: true,
		characterData: true,
		characterDataOldValue: true,
		subtree: true,
	}

	const callback = (mutationList, observer) => {
		console.log('mutation occcured')
	}

	const mutate = new MutationObserver(callback)

	mutate.observe(arrivaltime, config);




	const values = {
		"couriercompany":	couriercompany.value,
		"cargo": cargo.value,
		"arrivaltime": arrivaltime.value,
		"departuretime": departuretime.value,
		"gate": gate.value,
	}
	

	
	console.log('entering editable state');
}



export function exitingEditableState(e) {


	console.log('exiting editable state')
}





