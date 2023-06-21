
import Global from "../Global.js";
import { deleteXHR } from "../xhr-operations.js";
import { getEntryID } from "../utility.js";

export function deleteButtonHandler(e) {

	const row = e.target
	console.log('deleting')

	const entryID = getEntryID(row);

	deleteXHR(entryID).then(() => {

			console.log('before', Global.entries);

		// Delete the entry from the Global.entries Map
		Global.entries.delete(entryID);

		// Remove the row from the DOM
		row.remove();

			console.log('after', Global.entries)

			console.log('DELETE was successful!');
	})
}
