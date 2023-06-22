
const saveAsPDFButton = document.querySelector('#save-as-pdf');

saveAsPDFButton.addEventListener('click', (e) => {

	console.log('saving as pdf');
	
	getPDFXHR().then(() => console.log('opening PDF'));

	const button = e.target;

	button.style['animation'] = '100ms ease-in-out forwards buttonClick';
	button.addEventListener('animationend', () => {
		button.style['animation'] = ''
		console.log('animation cleared');
	}, { once: true });

})







		// - 'GET' - '/pdf' - Get pdf of this webpage.
		function getPDFXHR() {

			return new Promise((resolve, reject) => {

				// 1.) First, CREATE a new XMLHttpRequest
				const xhr = new XMLHttpRequest()

				// 2.) Second, DEFINE the XMLHttpRequest. What type of request is it, to where should it go, and is it asyncronous?
				xhr.open('GET', '/entries/06092023/turner11/pdf', true);

				xhr.responseType = 'blob'; // Set the response type to 'blob'

				// 3.) Third, define what you will DO once the request is sent, and a response is received.
				xhr.onload = function() {

					if(this.status >= 200 && this.status < 300) {

						const blob = new Blob([this.response], {type: 'application/pdf'});
						const url = window.URL.createObjectURL(blob);
						window.open(url); // open the PDF in a new tab
						
					} else {

						const error = new Error(`Request failed with a status of: ${this.status}`)

						reject(error);
					}
				}

				// 5.) Finally, SEND out the request.
				xhr.send();
			});
		};

		// Call it like this:
		// getXHR().then((responseObject) => {
		// 	console.log(responseObject)
		// })

