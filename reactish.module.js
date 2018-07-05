// unEntity isn't ideal. Hmm
function unEntity(str) {
	return str
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/\&#x27;/g, "'");
}

// This hack changes Array.join's default separator
(function(join) {
	Array.prototype.join = function(...params) {
		params[0] = params[0] || '';
		return join.apply(this, params);
	}
})(Array.prototype.join);

const utils = {
	convert: function(strings, ...params) {
		const htmlString = strings.map((str, pos) => str + (params[pos] || "")).join('');
		
		const dom = new DOMParser();
		return dom.parseFromString(htmlString, 'text/html');
	},
	bindEvents: function(events, dom) {
		Object.keys(events).map(selector => {
			Object.keys(events[selector]).map((eventName) => {
				Array.from(dom.querySelectorAll(selector)).map(node => {
					// console.log('binding', eventName, selector, events[selector][eventName], this, node);
					node.addEventListener(eventName, events[selector][eventName].bind(this));
				});
			});
		});
	}
}

export const render = function(template, params, events) {
	const names = Object.keys(params);
	const vals = Object.values(params);
	const content = unEntity(template);

	// Use tagged template (utils.convert) to...
	//		1) combine data and template text
	//		2) convert template text to dom tree
	const dom = (new Function(...names, `return this.convert\`${content}\`;`)).call(utils, ...vals);
	
	//Causes the customelements to be evaluated
	const newElement = document.importNode(dom.body, true);
	//Create a document fragment
	const frag = document.createDocumentFragment()
	Array.from(newElement.childNodes).map(x => frag.appendChild(x));
	//Reset element content and append fragment
	events && utils.bindEvents.call(this, events, frag);

	// return dom.body;
	return frag;
};

export default utils;