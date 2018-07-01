// Renders from template #myRow with data context passed as props

class AppRow extends HTMLElement {
	constructor() {
		super();
		this.props = {};
		this.state = {
			hasState: true,
			number: 0
		};
		//Render, and backup original children (not efficient, or responsive, gah)
		this.childs = Array.prototype.map.call(
			this.childNodes,
			node =>
				(node.render && node.render()) ||
				node.textContent ||
				node.innerText ||
				""
		);

		this.getAttributeNames().map(
			x => (this.props[x] = this.getAttribute(x))
		);
	}
	connectedCallback() {
		console.log('App-row connectedCallback')
		//this.innerHTML = this.render();
		const dom = this.render();
		const element = this;
		//Causes the customelements to be evaluated
		const newElement = document.importNode(dom, true);
		// element.parentNode.replaceChild(newElement, element);
		const frag = document.createDocumentFragment()
		Array.from(newElement.childNodes).map(x => frag.appendChild(x));
		element.innerHTML = '';
		element.appendChild(frag);
		//TODO: Remove this
		//setInterval(() => ++this.state.number && this.rerender(), 1000);
	}
	// disconnectedCallback() {}
	attributeChangedCallback(attrName, oldVal, newVal) {
		console.log("attributeChangedCallback", attrName, oldVal, newVal);
	}
	increment() {
		console.log("incrementing", this.number);
		this.number++;
		this.rerender();
	}
	rerender() {
		//this.innerHTML = this.render();
	}
	events() {
		return {
			'.clickable': {
				'onClick': this.increment.bind(this)
			}
		}
	}
	render() {
		const row = document.querySelector("#myRow");
		const template = row.innerHTML;
		const state = this.state;
		const props = this.props;

		console.log("rendering app-row");
		const dom = template.interpolate(
			Object.assign(
				{ props },
				{ state },
				{
					children: this.childs,
					//TODO: This (of course) doesn't bind, but renders as text
					//TODO: Interpolate needs to be more complex to bind functions
					// onClick: "javascript:this.increment()"
					//onClick: "javascript:console.log(this)"
				}
			),
			this.events()
		//TODO: There must be a better way to do this than innerHTML
		)//.innerHTML;
		console.log('dom in app-row', dom);
		return dom;
	}
}

if (window.customElements) {
	//console.log('Registering app-row');
	window.customElements.define("app-row", AppRow);
} else {
	console.error("No support for custom elements");
}
