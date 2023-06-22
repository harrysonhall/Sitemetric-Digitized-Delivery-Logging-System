import { getXHR } from "./xhr-operations.js";
import Global from "./Global.js";
import { enteringEditableState, exitingEditableState } from "./eventHandlers/editableEventHandler.js";
import { confirmButtonHandler } from "./eventHandlers/confirmEventHandler.js";
import { deleteButtonHandler } from "./eventHandlers/deleteEventHandler.js";
import { filterFromSearchbar } from "./eventHandlers/searchEventHandler.js";
import { filterEntriesByGate } from "./eventHandlers/gatesEventListener.js";
import { checkAndUpdateStatus } from "./middlewareFunctions.js";



		function buildNewEntryElements(entry) {

			// Create row element
			const newRow = createNewRowElement();

			// Set the row's values
			setRowValues(newRow, entry);

			// Assign the newRow to the entry object
			assignElementToValuesObject(newRow, entry);

			
			// Set the row to 'closed' if on mobile
			if(window.innerWidth < 1500)	newRow.setAttribute('closed', '');
			

			// Append it to the entries
			document.querySelector('#entries').appendChild(newRow);
		}



			export function createNewRowElement() {

				const newRow = document.querySelector('template#default-row').content.cloneNode(true).children[0];

				if(window.innerWidth >= 1500) { 

					const desktopElements = document.querySelector('template#desktop-elements').content.cloneNode(true);
					newRow.appendChild(desktopElements);

				} else {

					const mobileElements = document.querySelector('template#mobile-elements').content.cloneNode(true);
					newRow.appendChild(mobileElements);
				}

				// Add event listeners
				setEventListeners(newRow);

				return newRow;
			}


			export function setRowValues(row, values) {

				setDefaultRowValues(row, values);

				(window.innerWidth >= 1500) ? setDesktopRowValues(row, values) : setMobileRowValues(row, values);
			}


					export function setDefaultRowValues(row, values) {
						// Set Default Row Values
						row.id 																			= values._id;
						row.children['deliveryid-container'].children['deliveryid-text'].innerHTML 		= values._id;
						row.children['date'].value 														= values.date;
						row.children['couriercompany'].value 											= values.couriercompany;
						row.children['cargo'].value 													= values.cargo;
						row.children['arrivaltime'].children['time-value'].innerHTML					= values.arrivaltime;
						row.children['gate'].children['gate-value'].innerHTML 							= values.gate;
						if(values.departuretime === undefined ){
							row.children['departuretime'].children['time-value'].innerHTML					= '-';
							} else row.children['departuretime'].children['time-value'].innerHTML			= values.departuretime;
	
						checkAndUpdateStatus(row);
					}


					export function setDesktopRowValues(row, values) {
						// Set Desktop Specific Row Values
						row.children['courierpersonfirst'].value 		= values.couriername.first;
						row.children['courierpersonlast'].value 		= values.couriername.last;
					}


					export function setMobileRowValues(row, values) {
						// Set Mobile Specific Row Values
						row.children['mobile-date'].innerHTML 												= values.date;
						row.children['mobile-gate'].innerHTML 												= values.gate;
						row.children['mobile-time'].children['mobile-arrivaltime'].innerHTML 				= values.arrivaltime;
						row.children['courierperson'].value 												= `${values.couriername.first} ${values.couriername.last}`;
						if(values.departuretime === undefined ){
						row.children['mobile-time'].children['mobile-departuretime'].innerHTML 				= '-';
							} else row.children['mobile-time'].children['mobile-departuretime'].innerHTML 	= values.departuretime;
						if(values.couriername.first === "" && values.couriername.last === "") {
						row.children['courierperson'].value											= ""}
					}


					export function assignElementToValuesObject(row, values) {

						values.element = row;
					}


					function setEventListeners(row) {

						row.addEventListener('enteringeditablestate', enteringEditableState);

						row.addEventListener('exitingeditablestate', exitingEditableState);
		
						row.addEventListener('confirm', confirmButtonHandler);

						row.addEventListener('delete', deleteButtonHandler);

					}






getXHR().then((responseObject) => {

	for(const entry of responseObject) {

		buildNewEntryElements(entry);

		Global.entries.set(entry._id, entry);
	
	}
}).then(() => {

	filterFromSearchbar();

	filterEntriesByGate();
})





const notificationModal = document.querySelector('#notification-modal');
