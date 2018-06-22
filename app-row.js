
// Renders from template #myRow with data context passed as props

class AppRow extends HTMLElement {
	constructor() {
		super()
		this.state = {
			hasState: true
		}
		this.props = {};
		this.getAttributeNames().map(x => this.props[x] = this.getAttribute(x));
	}
	connectedCallback() {
	    this.innerHTML = this.render();
	}
	// disconnectedCallback() {}
	attributeChangedCallback(attrName, oldVal, newVal) {
		console.log('attributeChangedCallback', attrName, oldVal, newVal)
	}
	render() {
		const row = document.querySelector('#myRow');
		const template = row.innerHTML;
		
		// console.log('this.props', this.props);
		return template.interpolate(Object.assign(this.props, {
			children: Array.prototype.map.call(this.childNodes, node => 
				(node.render && node.render()) || 
				node.textContent || 
				node.innerText || 
				"")
		}));
	}
}

if(window.customElements) {
	window.customElements.define('app-row', AppRow);
} else {
	console.error('No support for custom elements');
}