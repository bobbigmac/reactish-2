
// Renders from template #myRow with data context passed as props

class AppRow extends HTMLElement {
	constructor() {
		super()
		this.props = {};
		this.state = {
			hasState: true,
			number: 0
		}
		this.childs = Array.prototype.map.call(this.childNodes, node => 
			(node.render && node.render()) || 
			node.textContent || 
			node.innerText || 
			""
		);

		this.getAttributeNames().map(x => this.props[x] = this.getAttribute(x));
	}
	connectedCallback() {
	    this.innerHTML = this.render();
	    setInterval(() => ++this.state.number && (this.innerHTML = this.render()), 1000);
	}
	// disconnectedCallback() {}
	attributeChangedCallback(attrName, oldVal, newVal) {
		console.log('attributeChangedCallback', attrName, oldVal, newVal)
	}
	render() {
		const row = document.querySelector('#myRow');
		const template = row.innerHTML;
		const state = this.state;
		const props = this.props;
		
		// console.log('this.props', this.props);
		return template.interpolate(Object.assign({ props }, { state }, {
			// children: this.childNodes
			children: this.childs
		}));
	}
}

if(window.customElements) {
	window.customElements.define('app-row', AppRow);
} else {
	console.error('No support for custom elements');
}