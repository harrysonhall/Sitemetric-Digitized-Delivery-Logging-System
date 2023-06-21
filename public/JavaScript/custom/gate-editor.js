import Global from "../Global.js";
import { sleep } from "../utility.js";


	let gateTimeoutID;

	window.gateScrollHandler = function(e) {

		clearTimeout(gateTimeoutID);
		
		gateTimeoutID = setTimeout(() => {

			const gateEditorElement = e.target.parentElement;

			if(gateEditorElement.parentElement !== null)	setNewGate(gateEditorElement);

		}, 250);

	}



	export function enableGateEditing(clickEvent) {

		const gateElement = clickEvent.target;
		const row = clickEvent.target.parentElement;

		if(row.hasAttribute('editable') && gateElement.hasAttribute('disabled') && Global.currentGateEditor === null) {

			// Enable the gate
			gateElement.removeAttribute('disabled');
			gateElement.setAttribute('enabled', '');

			// Dispatch a new gateEditorElement
			dispatchNewGateEditor(gateElement);

		}
	}



	export async function disableGateEditing() {
		
		// Set the new gate
		setNewGate(Global.currentGateEditor);

		// Disable the gate
		Global.currentGateEditor.parentElement.removeAttribute('enabled');
		Global.currentGateEditor.parentElement.setAttribute('disabled', '');

		// Set the outro animationn
		Global.currentGateEditor.style['animation'] = '100ms ease-in-out forwards timePickerOutro';

		// Pause execution for animation to play out
		await sleep(100);

		// Remove the Global.currentTimeEditor from the DOM
		Global.currentGateEditor.remove();

		// Set the Global.currentTimeEditor back to null
		Global.currentGateEditor = null;
	};



			function dispatchNewGateEditor(gateElement) {

				// Clone a 'gateEditorElement'
				const gateEditorElement = document.querySelector('template#gate-editor-template').content.cloneNode(true).children[0];

				// Append it to the gateElement
				gateElement.appendChild(gateEditorElement);

				// Scroll to the current gate
				scrollToCurrentGate(gateElement, gateEditorElement);

				// Set the Global.currentGateEditorElement
				Global.currentGateEditor = gateEditorElement;
			}



			function scrollToCurrentGate(gateElement, gateEditorElement) {
				
				const currentGate 	= gateElement.querySelector('#gate-value');

				const gate 			= gateEditorElement.querySelector('#gate-container');

				console.log(gateEditorElement)

				gate.scrollTop 		= (function() {

					switch(currentGate.innerHTML) {

						case "Gate A": return 1 * 38;
						case "Gate B": return 2 * 38;
						case "Gate C": return 3 * 38;
					}
				})()
			}


			function setNewGate(gateEditorElement) {

				const gateValueElement = gateEditorElement.parentElement.querySelector('#gate-value');

				const gate =		gateEditorElement.querySelector('#gate-container');

				const newGateValue = 		gate.children[parseInt(gate.scrollTop/38) + 1].innerHTML;

				gateValueElement.innerHTML = newGateValue;
			}
