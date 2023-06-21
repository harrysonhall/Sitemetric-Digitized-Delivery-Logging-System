import Global from "../Global.js";

// Initialize the gates
for(const gate of document.querySelectorAll('[gate]')) {

	Global.gates[gate.innerHTML] = {
		element: gate,
		status: (function() {
			if(gate.hasAttribute('inactive')) return 'inactive';
			else if(gate.hasAttribute('active')) return 'active';
		})()
	}
}



		export function toggleGate(gateElement) {

			if(gateElement.hasAttribute('inactive')) {

				gateElement.removeAttribute('inactive');
				gateElement.setAttribute('active', '');
				Global.gates[gateElement.innerHTML].status = 'active';

			} else if(gateElement.hasAttribute('active')) {

				gateElement.removeAttribute('active');
				gateElement.setAttribute('inactive', '');
				Global.gates[gateElement.innerHTML].status = 'inactive';
			}

			for(const gate in Global.gates) {

				if(Global.gates[gate].status === "active"){

					Global.gates[gate].element.style['color'] = "black";

				} else Global.gates[gate].element.style['color'] = '#BFBFBF';
			}


			console.log(Global.gates)
			filterEntriesByGate();
		}




				export function filterEntriesByGate() {
					
					const activeGates = [];
					const inactiveGates = [];

					for(const gate in Global.gates) {
						if(Global.gates[gate].status === 'active') activeGates.push(gate)
						if(Global.gates[gate].status === 'inactive') inactiveGates.push(gate);
					}
					
			
					for(const [key, value] of Global.entries) {
						if(activeGates.some(gate => value.gate.includes(gate))){
							value.element.style['display'] = 'grid';
						} else {
							value.element.style['display'] = 'none';
						}
					}
					

					console.log('filtered entries by gate')
				}
