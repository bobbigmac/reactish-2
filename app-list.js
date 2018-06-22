
//Placeholder container (doesn't really do anything yet, see app-row.js)

class AppList extends HTMLElement {
	constructor() {
		super()
		this.state = {
			hasState: true
		}
	}
	connectedCallback() {
		var childNodes = this.childNodes;
	    // this.innerHTML = "<b>I'm a custom element, app-list!: "+this.innerText+"</b>";
	}
	disconnectedCallback() {}
	attributeChangedCallback(attrName, oldVal, newVal) {
		console.log('attributeChangedCallback', attrName, oldVal, newVal)
	}
}

if(window.customElements) {
	// window.customElements.define('app-drawer', AppDrawer, {extends:'button'});
	window.customElements.define('app-list', AppList);
} else {
	console.error('No support for custom elements');
}