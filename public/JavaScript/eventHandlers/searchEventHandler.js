
import Global from "../Global.js";

let currentSearchFilter = "";
const searchbar = document.querySelector('input#search');

searchbar.addEventListener('input', (e) => {

	currentSearchFilter = e.target.value.toLowerCase()

	console.log(currentSearchFilter)

	filterFromSearchbar();
})


		export function filterFromSearchbar() {

			for(const [key, value] of Global.entries) {

				const isVisible = (value.cargo.toLowerCase().includes(currentSearchFilter)
								|| value.couriercompany.toLowerCase().includes(currentSearchFilter)
								|| value.couriername.first.toLowerCase().includes(currentSearchFilter)
								|| value.couriername.last.toLowerCase().includes(currentSearchFilter));

				if(isVisible) value.element.style['display'] = "grid"

				else if(!isVisible) value.element.style['display'] = "none";
			}
		}