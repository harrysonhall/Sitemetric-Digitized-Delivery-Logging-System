import Global from "./Global.js";
import { createEntryValues, setToEditableState, setToNonEditableState, toggleMobileOpenOrClose } from "./utility.js";
import { toggleGate } from "./eventHandlers/gatesEventListener.js";
import { disableTimeEditing, enableTimeEditing } from "./custom/time-editor.js";
import { disableGateEditing, enableGateEditing } from "./custom/gate-editor.js";
import { createNewRowElement, setRowValues } from "./onStart.js";


const entries = document.querySelector('#entries');



document.addEventListener('click', async (clickEvent) => {

	// This is a check to disable editing of a form and r
	if(Global.currentEditableForm !== null) { 

		const elements = document.elementsFromPoint(clickEvent.clientX, clickEvent.clientY);

		if(elements.includes(Global.currentEditableForm) === false) {
			
			// Set to non-editable state
			setToNonEditableState();
		};
	};
	

	// For disabling of time editor
	if(Global.currentTimeEditor !== null) {

		let shouldClearTime = false;
		const elements = document.elementsFromPoint(clickEvent.clientX, clickEvent.clientY);
		if(clickEvent.target.id === 'clear-time')  shouldClearTime = true;
		if(!elements.includes(Global.currentTimeEditor)) 	await disableTimeEditing(shouldClearTime);
	};
	// For enabling of the time editor
	if(clickEvent.target.hasAttribute('time')) 		enableTimeEditing(clickEvent);
	



	// For disabling of gate editor
	if(Global.currentGateEditor !== null) {

		const elements = document.elementsFromPoint(clickEvent.clientX, clickEvent.clientY);
		if(!elements.includes(Global.currentGateEditor)) 	await disableGateEditing();
	};
	// For enabling of the gate editor
	if(clickEvent.target.hasAttribute('gate'))		enableGateEditing(clickEvent);





	if(clickEvent.target.id === "create-new-entry") {

		createNewEntry(clickEvent);
	}




	// This is a check for toggling the gates filter
	if(clickEvent.target.hasAttribute('gate')) 		toggleGate(clickEvent.target);
});












		function createNewEntry(e) {

			if(Global.currentEditableForm === null) {

				// Create a new row
				const newRow = createNewRowElement();

				// Get default values for it
				const values = createEntryValues();

				// Set its values
				setRowValues(newRow, values);

				// Toggle it to be open
				toggleMobileOpenOrClose(newRow);

				// Append it to the entries
				entries.appendChild(newRow);

				// Set it as the Global.currentEditableForm
				Global.currentEditableForm = newRow;

				Global.currentNewEntry =  newRow;

				setToEditableState();
			}

			const button = e.target;

			button.style['animation'] = '100ms ease-in-out forwards buttonClick';
			button.addEventListener('animationend', () => {
				button.style['animation'] = ''
				console.log('animation cleared');
			}, { once: true });
		}