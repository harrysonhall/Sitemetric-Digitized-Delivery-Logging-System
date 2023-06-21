import { disableTimeEditing } from "./time-editor.js";

window.clearTimeClickPropagationEvent = async function(clickEvent) {

	clickEvent.stopImmediatePropagation();

	await disableTimeEditing(true);

	console.log('cleared');
}