
import reactish, { render } from './reactish.module.js';

class AppList extends HTMLElement {
	constructor() {
		super()
		this.state = {
			hasState: true
		}
	}
	connectedCallback() {
		const div = document.createElement("div");
		const row = document.querySelector("#myTable");
		// Get the template's html as a string
		const template = row.innerHTML;

		//TODO: Script injection breaks things, but doesn't execute. There probably is a way to make it do so.
		const dom = render.call(this, template, {
			title: "Hello World",
			rows: [
				{
					title: "Row 1",
					text: "Row 1 text"
				},
				{
					title: "Row 2",
					text: "Row 2 text"
				}
			]
		});

		Array.from(this.children).forEach(x => this.removeChild(x));
		this.appendChild(dom);
	}
	// disconnectedCallback() {}
	attributeChangedCallback(attrName, oldVal, newVal) {
		console.log('attributeChangedCallback', attrName, oldVal, newVal)
	}
}

if(window.customElements) {
	//console.log('Registering app-list');
	window.customElements.define('app-list', AppList);
} else {
	console.error('No support for custom elements');
}