import Global from "./Global.js";
import { setToNonEditableState } from "./utility.js";
import { setRowValues } from "./onStart.js";


const entriesContainer = document.querySelector('#entries');

window.addEventListener('resize', () => {

	// Checking for if its greater than or equal to 1500
	switch(window.innerWidth >= 1500) {

		case true: resizeForDesktop();	break;

		case false: resizeForMobile();	break;

	}
	console.log('resize occuring')
})











		const desktopElementsTemplate = document.querySelector('template#desktop-elements');

		function resizeForDesktop() {
			
			// 1.) First, check if mobile elments exist and if so we will remove them
			const mobileElements = document.querySelectorAll('[mobile]');
			if(mobileElements.length > 0)	for(const element of mobileElements)	element.remove();
			

			// 2.) Second, then check if desktop elements already exist
			const desktopElements = document.querySelectorAll('[desktop]');
			if(desktopElements.length > 0) return;



			for(const row of document.querySelectorAll('.row')) {
				
				// If they don't well clone a copy of the desktop elements template
				// for each row and add it to the row
				row.appendChild(desktopElementsTemplate.content.cloneNode(true));
				
				// Remove the 'opened' and 'closed' mobile attributes
				if(row.hasAttribute('opened'))	row.removeAttribute('opened');
				if(row.hasAttribute('closed'))	row.removeAttribute('closed');

				// If a currentlyEditableForm exists, set it to non-editable, otherwise, set the name values
				if(Global.currentEditableForm !== null) { 

					setToNonEditableState(row);

				} else { 

					if(Global.entries.get(row.id) !== undefined)	setRowValues(row, Global.entries.get(row.id));
				}
			}
		}
















		const mobileElementsTemplate = document.querySelector('template#mobile-elements');

		function resizeForMobile() {

			// 1.) First, check if desktop elments exist and if so we will remove them
			const desktopElements = document.querySelectorAll('[desktop]');
			if(desktopElements.length > 0) 	for(const element of desktopElements)	element.remove();
			
			
			// 2.) Second, then check if mobile elements already exist
			const mobileElements = document.querySelectorAll('[mobile]');
			if(mobileElements.length > 0) return;


			for(const row of document.querySelectorAll('.row')) {

				// If they dont well clone a copy of the mobile elements template
				//  for each row and add it to the row
				row.appendChild(mobileElementsTemplate.content.cloneNode(true));
				
				// Add the mobile 'closed' attribute if the form row doesn't already have it
				if(!row.hasAttribute('closed')) row.setAttribute('closed', '');

				// If a currentlyEditableForm exists, set it to non-editable, otherwise, set the name values
				if(Global.currentEditableForm !== null) { 
					
					setToNonEditableState(row) 
				} else { 

					if(Global.entries.get(row.id) !== undefined)	setRowValues(row, Global.entries.get(row.id));
					
				}
			}
		}