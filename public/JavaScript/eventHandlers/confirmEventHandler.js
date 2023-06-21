
import Global from "../Global.js";
import { extractFormValues, setToNonEditableState, validateForm, getEntryID } from "../utility.js";
import { postXHR, patchXHR } from "../xhr-operations.js";

export function confirmButtonHandler(e) {

	const row = e.target;

	console.log('confirm button clicked');

	const isValid = validateForm(row);

	if(isValid) {

		if(Global.currentNewEntry !== null) {	// For POST Requests

			post(row);

		} else { // For PATCH Requests
			
			console.log('PATCH')
			
			patch(row);
			
		};
	};
};




			// Handles POST Requests
			function post(row) {
				
				// Extract the form values
				let values = extractFormValues(row);
				
				// Make the request
				postXHR(values).then((responseObject) => {
				
					// Assign the row.id to the new ID value from MongoDB
					row.id = responseObject._id;
					
					// Assign the element to the values
					responseObject.element = row;
				
					// Push the new values object into the entries
					Global.entries.set(responseObject._id, responseObject)
				
					// Put the row into a non editable state
					setToNonEditableState();
				
					// Dispatch notifcation to notification modal

					console.log('POST Request was successful')
				});
			}





			// Handles PATCH Requests
			function patch(row) {
				
				const entryID = getEntryID(row)
				
				const targetObject = extractFormValues(row);
				const controlObject = Global.entries.get(entryID);

				const newValues = compare(targetObject, controlObject);
				
				patchXHR(entryID, newValues).then(() => {

					// Update the Global.entries with the new data
					Object.assign(Global.entries.get(entryID), newValues);

					// Put the row into a non editable state
					setToNonEditableState();

					// Dispatch notifcation to notification modal

					console.log('PATCH was successful!');
				});
			};







			function compare(targetObject, controlObject) {
				
				let newValues = {};

				if(targetObject.couriercompany 	!== controlObject.couriercompany)	newValues.couriercompany 	= targetObject.couriercompany;
				if(targetObject.cargo 			!== controlObject.cargo) 			newValues.cargo 			= targetObject.cargo;
				if(targetObject.arrivaltime		!== controlObject.arrivaltime)		newValues.arrivaltime 		= targetObject.arrivaltime;
				if(targetObject.departuretime 	!== controlObject.departuretime)	newValues.departuretime 	= targetObject.departuretime;
				if(targetObject.gate 			!== controlObject.gate)				newValues.gate 				= targetObject.gate;
				newValues.couriername = {};
				newValues.couriername.first = targetObject.couriername.first;
				newValues.couriername.last = targetObject.couriername.last;

				return newValues;
			}