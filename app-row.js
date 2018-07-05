
import reactish, { render } from './reactish.module.js';

class AppRow extends HTMLElement {
	constructor() {
		super();

		var reactiveTrap = {
			set: (target, key, value) => {
				target[key] = value;
				this.render(this.build());
				return true;
			}
		};

		const state = {
			number: 0,
			templateSelector: '#myRow',
		};
		
		this.getAttributeNames().map(
			attr => (state[attr] = this.getAttribute(attr))
		);

		// setInterval(() => this.increment(), 1000);

		//Render, and store original children (not efficient, or responsive, but works)
		this.childs = Array.prototype.map.call(
			this.childNodes,
			node =>
				(node.build && node.build()) ||
				node.textContent || node.innerText || "" //A bit hacky
		);

		// Create a proxy to monitor changes to props
		this.state = new Proxy(state, reactiveTrap);
	}
	connectedCallback() {
		this.render(this.build());
	}
	disconnectedCallback() {
		console.log('Disconnected');
	}
	attributeChangedCallback(attrName, oldVal, newVal) {
		console.log("attributeChangedCallback", attrName, oldVal, newVal);
	}
	increment() {
		console.log(`incrementing ${this.state.title} from ${this.state.number} to ${++this.state.number}`);
	}
	events() {
		return {
			'.clickable': {
				'click': this.increment.bind(this)
			}
		}
	}
	build() {
		const state = this.state;
		const row = document.querySelector(state.templateSelector);
		const template = row.innerHTML;

		const dom = render.call(this, template,
			Object.assign(
				{ state },
				{ children: this.childs }
			),
			this.events()
		)
		return dom;
	}
	render(dom) {
		console.log('Rendering row', this.state.title, this.state.number);
		Array.from(this.childNodes).map(x => this.removeChild(x));
		//TODO: Could render to virtual-dom...
		//			Would be able to diff new and 
		//			existing childNodes to only apply changes
		this.appendChild(dom);
	}
}

if (window.customElements) {
	//console.log('Registering app-row');
	window.customElements.define("app-row", AppRow);
} else {
	console.error("No support for custom elements");
}
