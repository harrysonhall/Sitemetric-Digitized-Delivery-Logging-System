

// Here are the following routes for each type of HTTP request:
// - 'GET' - '/' - Get all entries.
// - 'POST' - '/' - Post a new entry.
// - 'PATCH' - '/:id' - Update an existing entry.
// - 'DELETE' - '/:id' - Delete an existing entry.



// - 'GET' - '/' - Get all entries.
export function getXHR() {

	return new Promise((resolve, reject) => {

		// 1.) First, CREATE a new XMLHttpRequest
		const xhr = new XMLHttpRequest()

		// 2.) Second, DEFINE the XMLHttpRequest. What type of request is it, to where should it go, and is it asyncronous?
		xhr.open('GET', '/entries/06092023/turner11', true);

		// 3.) Third, define what you will DO once the request is sent, and a response is received.
		xhr.onload = function() {

			if(this.status >= 200 && this.status < 300) {

				const responseObject = JSON.parse(this.response);

				resolve(responseObject);

				
			} else {

				const error = new Error(`Request failed with a status of: ${this.status}`)

				reject(error);
			}
		}

		// 4.) Fourth, SET your request headers. 
		xhr.setRequestHeader('Content-Type', 'application/json');

		// 5.) Finally, SEND out the request.
		xhr.send();
	});
};

// Call it like this:
// getXHR().then((responseObject) => {
// 	console.log(responseObject)
// })











// - 'POST' - '/' - Post a new entry.
export function postXHR(data) {

	return new Promise((resolve, reject) => {

		// 1.) First, CREATE a new XMLHttpRequest
		const xhr = new XMLHttpRequest();

		// 2.) Second, DEFINE the XMLHttpRequest. What type of request is it, to where should it go, and is it asyncronous?
		xhr.open('POST', `/entries/06092023/turner11`, true);

		// 3.) Third, define what you will DO once the request has been sent, and a response is received.
		xhr.onload = function() {

			if(this.status >= 200 && this.status < 300) {

				const responseObject = JSON.parse(this.response);

				// console.log(responseObject);
			
				resolve(responseObject)

			} else {

				const error = new Error(`Request failed with a status of: ${this.status}`);

				reject(error);
			}
		}

		// 4.) Fourth, SET the request headers.
		xhr.setRequestHeader('Content-Type', 'application/json');

		// 5.) Finally, SEND out the request.
		xhr.send(JSON.stringify(data));

});
}

// Call it like this:
// postsXHR(dataObject).then((responseObject) => {
// 	console.log(responseObject);
// })















// - 'PATCH' - '/:id' - Update an existing entry.
export function patchXHR(entryID, data) {

	return new Promise((resolve, reject) => {

		// 1.) First, CREATE a new XMLHttpRequest.
		const xhr = new XMLHttpRequest();

		// 2.) Second, DEFINE the XMLHttpRequest. What type of request is it, to where should it go, and is it asyncronous?
		xhr.open('PATCH', `/entries/06092023/turner11/${entryID}`, true);

		// 3.) Third, define what you will DO once the request is sent, and a response is received.
		xhr.onload = function() {

			if(this.status >= 200 && this.status < 300) {

				resolve(this);

			} else {

				const error = new Error(`Request failed with status code of: ${this.status}`);

				reject(error);

			}
		}

		// 4.) Fourth, SET the request headers.
		xhr.setRequestHeader('Content-Type', 'application/json');
		// 5.) Finally, SEND out the request.
		xhr.send(JSON.stringify(data));
	});
}

// Call it like this:
// patchXHR(entryID, data).then(() => {
// 	console.log('PATCH was successful!');
// })














// - 'DELETE' /gates:id/deliveries/:id - Delete a delivery entry at a specific gate.
export function deleteXHR(entryid) {

	return new Promise((resolve, reject) => {

		// 1.) First, CREATE a new XMLHttpRequest.
		const xhr = new XMLHttpRequest();

		// 2.) Second, DEFINE the XMLHttpRequest. What type of request is it, to where should it go, and is it asyncronous?
		xhr.open('DELETE', `/entries/06092023/turner11/${entryid}`, true);

		// 3.) Third, define what you will DO once the request is sent, and a response is received.
		xhr.onload = function() {

			if(this.status >= 200 && this.status < 300) {

				resolve();

			} else {

				const error = new Error(`Request failed with status code of: ${this.status}`);

				reject(error);

			}
		}

		// 4.) Fourth, SET the request headers.
		xhr.setRequestHeader('Content-Type', 'application/json');

		// 5.) Finally, SEND out the request.
		xhr.send();
	});
}

// Call it like this:
// deleteXHR(entryid).then(() => {
// 	console.log('DELETE was successful!');
// })