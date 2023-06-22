import Global from "./Global.js";
import { setDefaultRowValues, setDesktopRowValues, setMobileRowValues, setRowValues } from "./onStart.js";
import { filterEntriesByGate } from "./eventHandlers/gatesEventListener.js";
import { checkAndUpdateStatus } from "./middlewareFunctions.js";






// Pause the current thread for # of milliseconds
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}





// Get the current local time - Return Example: '4:59 PM'
export function getCurrentTime() {

    const date = new Date();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let meridiem = hours < 12 ? 'AM' : 'PM';

    hours = hours % 12;
    if (hours === 0) 	hours = 12;

    // Add leading zero to minutes if necessary
    if (minutes < 10) minutes = '0' + minutes;

    return `${hours}:${minutes} ${meridiem}`
}





// Get the current local date - Return Example: 'June 20, 2023'
export function getCurrentDate() {
	const date = new Date();

	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const month = months[date.getMonth()];

	return `${month} ${date.getDate()}, ${date.getFullYear()}`
}






// Get the _id of the given entry / row
export function getEntryID(row) {

    // Find the element in the Global.entries map that matches with target element
    for(const [key, value] of Global.entries) {

        if(value.element === row)		return value._id;
    }
}






// Create default values for a new delivery entry
export function createEntryValues() {

    return {
        "_id": "--",
        "date": getCurrentDate(),
        "couriercompany": "",
        "cargo": "",
        "arrivaltime": getCurrentTime(),
        "departuretime": "-",
        "gate": Global.defaultGate,
        "couriername": {
            "first": "",
            "last": ""
        }
    }
}






// Validate the form row data
export function validateForm(row) {

    let isValid = true;

    if(row.querySelector('#couriercompany').value.length === 0) 	                isValid = false; 
    if(row.querySelector('#cargo').value.length === 0) 				                isValid = false;
    if(row.querySelector('#arrivaltime #time-value').innerHTML.length < 2)		    isValid = false;
    if(row.querySelector('#gate #gate-value').innerHTML.length === 0)			    isValid = false;

    if(window.innerWidth >= 1500){

        if(row.querySelector('#courierpersonfirst').value.length === 0)             isValid = false;
        if(row.querySelector('#courierpersonlast').value.length === 0)              isValid = false;

    } else if(window.innerWidth < 1500) {

        const courierperson = row.querySelector('#courierperson');

        if(courierperson.value.length === 0) 		isValid = false;
    }

    return isValid;
}







// Extract the form row data
export function extractFormValues(row) {

    const object = {
        "site":             "Turner_11",
        "deliveryid":       row.id,
        "date":             row.querySelector('#date').value,
        "couriercompany":   row.querySelector('#couriercompany').value,
        "cargo":            row.querySelector('#cargo').value,
        "arrivaltime":      row.querySelector('#arrivaltime #time-value').innerHTML,
        "departuretime":    row.querySelector('#departuretime #time-value').innerHTML,
        "gate":             row.querySelector('#gate #gate-value').innerHTML,
        "couriername": {
            "first": "",
            "last": ""
        }
    }

    if(window.innerWidth >= 1500){

        object.couriername.first = row.querySelector('#courierpersonfirst').value
        object.couriername.last = row.querySelector('#courierpersonlast').value

    } else if(window.innerWidth < 1500) {

        const courierperson = row.querySelector('#courierperson');

        if(courierperson.value.length !== 0)  {

            const nameParts = courierperson.value.split(/[\s]/);

            object.couriername.first = nameParts[0];

            // if(nameParts[1] === undefined) object.couriername.last = '';

            if(nameParts[1] !== undefined) object.couriername.last = nameParts[1]
        }

        if(courierperson.value.length === 0) 		isValid = false;
    }

    return object;

}









export function toggleMobileOpenOrClose(row) {

    if(window.innerWidth < 1500) {

        if(row.hasAttribute('closed')) {

            row.removeAttribute('closed');
            row.setAttribute('opened', '');

        } else if (row.hasAttribute('opened')) {

            row.removeAttribute('opened');
            row.setAttribute('closed', 'closed');

        } else if(!row.hasAttribute('closed') && !row.hasAttribute('opened')) {
            row.setAttribute('opened', '');
        }
    }
}








export function setToEditableState() {

	if(Global.currentEditableForm !== null) {

        // Dispatch a new event
        // Global.currentEditableForm.dispatchEvent(new CustomEvent('enteringeditablestate'));

		// Put row into an editable mode
		Global.currentEditableForm.setAttribute('editable', '')
		Global.currentEditableForm.focus();
	
		// Remove the disabled attribute from the inputs
		const inputs = Global.currentEditableForm.querySelectorAll('[editable]');
		for(const input of inputs) input.removeAttribute('disabled');
	}
}




export function setToNonEditableState() {

    if(Global.currentEditableForm !== null) { 

        checkAndUpdateStatus(Global.currentEditableForm);

        filterEntriesByGate();

        // If it's a new entry, set the Global.currentNewEntry back to null
        if(Global.currentNewEntry !== null) Global.currentNewEntry = null;

        // Dispatch a custom event
        // Global.currentEditableForm.dispatchEvent(new CustomEvent('exitingeditablestate'));

        // Put the row into a non-editable mode
		Global.currentEditableForm.removeAttribute('editable');

		// Add the disabled attribute to all the inputs
		const inputs = Global.currentEditableForm.querySelectorAll('[editable]')
		for(const input of inputs) input.setAttribute('disabled', '');

        // Revert the form values back to their orignal values
        revertFormValues();

        // Set the Global.currentEditableForm
        Global.currentEditableForm = null;
    }
}



        function revertFormValues() {

            const row = Global.currentEditableForm;
            const formValues = Global.entries.get(row.id);

            if(formValues === undefined) {    // For new entries
                
                // Remove the new entry
                Global.currentEditableForm.remove();
                
                // Reset the Global.currentEditableForm
                Global.currentEditableForm = null;
                
                return;
            } 
            
            setRowValues(row, formValues);

            console.log('reverting')
        }