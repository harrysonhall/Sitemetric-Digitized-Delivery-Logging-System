import Global from "./Global.js";
import { setToEditableState, setToNonEditableState, toggleMobileOpenOrClose } from "./utility.js";


window.delegateRowEvent = function(e) {

	const targetId = e.target.id;

	if (targetId === 'edit') {		// "Edit" Button
	
		console.log('edit button clicked');

		// Set the Global.currentEditableForm
		Global.currentEditableForm = e.target.parentElement;
		
		// Set to editable state
		setToEditableState();

		// Stop all events of type 'click' from further occuring.
		e.stopImmediatePropagation();


	} else if (targetId === 'delete') {		// "Delete" Button

		const row = e.target.parentElement;

		row.dispatchEvent(new CustomEvent('delete'));

	} else if (targetId === 'confirm') {	// "Confirm" Button
		
		const row = e.target.parentElement;

		row.dispatchEvent(new CustomEvent('confirm'));

	} else if (targetId === 'cancel') {		// "Cancel" Button

		// Set to non-editable state
		setToNonEditableState();

	} else if(e.offsetY <= 90) {

		toggleMobileOpenOrClose(e.target);
		
	}
}







