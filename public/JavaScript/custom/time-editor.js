import Global from "../Global.js";
import { sleep, getCurrentTime } from "../utility.js";

	let timeTimeoutID;

	window.timeScrollHandler = function(e) {

		clearTimeout(timeTimeoutID);
		
		timeTimeoutID = setTimeout(() => {

			const timePickerElement = e.target.parentElement;

			if(timePickerElement.parentElement !== null)	setNewTime(timePickerElement);

		},250);

	}



	export function enableTimeEditing(clickEvent) {

		const timeElement = clickEvent.target;
		const row = clickEvent.target.parentElement;

		if(row.hasAttribute('editable') && timeElement.hasAttribute('disabled') && Global.currentTimeEditor === null) {

			// Enable the time
			timeElement.removeAttribute('disabled');
			timeElement.setAttribute('enabled', '');

			// Dispatch a new timeEditorElement
			dispatchNewTimeEditor(timeElement);

		}
	}



	export async function disableTimeEditing(clearValues) {
		
		if(clearValues) {
			
			clearTime(Global.currentTimeEditor);

		} else {
			// Set the new time
			setNewTime(Global.currentTimeEditor);
		}

		// Disable the time
		Global.currentTimeEditor.parentElement.removeAttribute('enabled');
		Global.currentTimeEditor.parentElement.setAttribute('disabled', '');

		// Set the outro animationn
		Global.currentTimeEditor.style['animation'] = '100ms ease-in-out forwards timePickerOutro';

		// Pause execution for animation to play out
		await sleep(100);

		// Remove the Global.currentTimeEditor from the DOM
		Global.currentTimeEditor.remove();

		// Set the Global.currentTimeEditor back to null
		Global.currentTimeEditor = null;
	};



			function dispatchNewTimeEditor(timeElement) {

				// Clone a 'timePickerElement'
				const timeEditorElement = document.querySelector('template#time-picker-template').content.cloneNode(true).children[0];

				// Append it to the timeElement
				timeElement.appendChild(timeEditorElement);

				// Scroll to the current time
				scrollToCurrentTime(timeElement, timeEditorElement);

				// Set the Global.currentTimeEditorElement
				Global.currentTimeEditor = timeEditorElement;
			}



			function scrollToCurrentTime(timeElement, timeEditorElement) {

				const currentTime = timeElement.querySelector('#time-value');

				if(currentTime.innerHTML == '-') 	currentTime.innerHTML = getCurrentTime();

				const currentTimeSplit = currentTime.innerHTML.split(/[:\s]/);

				const hour 		= timeEditorElement.querySelector('#hour');
				const minute 	= timeEditorElement.querySelector('#minute');
				const meridiem 	= timeEditorElement.querySelector('#meridiem');

				hour.scrollTop 		= parseInt(currentTimeSplit[0]) * 38;
				minute.scrollTop	= (parseInt(currentTimeSplit[1]) + 1) * 38;
				meridiem.scrollTop 	= currentTimeSplit[2] == 'AM' ? 1 * 38 : 2 * 38; 
			}


			function setNewTime(timeEditorElement) {

				const timeValueElement = timeEditorElement.parentElement.querySelector('#time-value');

				const hour =		timeEditorElement.querySelector('#hour');
				const minute =		timeEditorElement.querySelector('#minute');
				const meridiem = 	timeEditorElement.querySelector('#meridiem');

				const newHourValue = 		hour.children[parseInt(hour.scrollTop/38) + 1].innerHTML;
				const newMinuteValue = 		minute.children[parseInt(minute.scrollTop/38) + 1].innerHTML;
				const newMeridiemValue =	meridiem.children[parseInt(meridiem.scrollTop/38) + 1].innerHTML;

				const newTimeValue = `${newHourValue}:${newMinuteValue} ${newMeridiemValue}`;

				timeValueElement.innerHTML = newTimeValue;
			}


			function clearTime(timeEditorElement) {

				const timeValueElement = timeEditorElement.parentElement.querySelector('#time-value');
				
				timeValueElement.innerHTML = '-';
			}
			