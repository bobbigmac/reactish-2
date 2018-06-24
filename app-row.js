
// Renders from template #myRow with data context passed as props

class AppRow extends HTMLElement {
	constructor() {
		super()
		this.props = {};
		this.state = {
			hasState: true,
			number: 0
		}
		//Render, and backup original children (not efficient, or responsive, gah)
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
	    //TODO: Remove this
	    //setInterval(() => ++this.state.number && this.rerender(), 1000);
	}
	// disconnectedCallback() {}
	attributeChangedCallback(attrName, oldVal, newVal) {
		console.log('attributeChangedCallback', attrName, oldVal, newVal)
	}
	increment() {
		console.log('incrementing', this.number);
		this.number++;
		this.rerender();
	}
	rerender() {
		this.innerHTML = this.render();
	}
	render() {
		const row = document.querySelector('#myRow');
		const template = row.innerHTML;
		const state = this.state;
		const props = this.props;
		
		console.log('here');
		return template.interpolate(Object.assign({ props }, { state }, {
			children: this.childs,
			//TODO: This (of course) doesn't bind, but renders as text
			//TODO: Interpolate needs to be more complex to bind functions
			// onClick: "javascript:this.increment()"
			onClick: "javascript:console.log(this)"
		}));
	}
}

if(window.customElements) {
	window.customElements.define('app-row', AppRow);
} else {
	console.error('No support for custom elements');
}