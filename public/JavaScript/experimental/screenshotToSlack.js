
const screenshotToSlackButton = document.querySelector('#send-screenshot-to-slack');

screenshotToSlackButton.addEventListener('click', (e) => {

	console.log('pushing to slack as pdf');
	
	getScreenshotToSlackXHR().then(() => console.log('sending screenshot'))

})



		// - 'GET' - '/pdf' - Get pdf of this webpage.
		function getScreenshotToSlackXHR() {

			return new Promise((resolve, reject) => {

				// 1.) First, CREATE a new XMLHttpRequest
				const xhr = new XMLHttpRequest()

				// 2.) Second, DEFINE the XMLHttpRequest. What type of request is it, to where should it go, and is it asyncronous?
				xhr.open('GET', '/entries/06092023/turner11/screenshot-to-slack', true);

				// 3.) Third, define what you will DO once the request is sent, and a response is received.
				xhr.onload = function() {

					if(this.status >= 200 && this.status < 300) {

						console.log('sent')
						
					} else {

						const error = new Error(`Request failed with a status of: ${this.status}`)

						reject(error);
					}
				}

				// 5.) Finally, SEND out the request.
				xhr.send();
			});
		};