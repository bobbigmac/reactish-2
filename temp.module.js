function unEntity(str) {
	return str
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"');
}

//blech
(function(join) {
	Array.prototype.join = function(sep) {
		return join.call(this, sep || "");
	};
})(Array.prototype.join);

window.convert = function(strings, ...params) {
	// console.log(strings, params);
	const htmlString = strings.map((str, pos) => str + (params[pos] || "")).join();
	const dom = new DOMParser();
	console.log('dom', dom);
	// return dom.parseFromString(htmlString, 'application/xml');
	return dom.parseFromString(htmlString, 'text/html');
};

String.prototype.interpolate = function(params, events) {
	const names = Object.keys(params);
	const vals = Object.values(params);
	const content = unEntity(this);

	// console.log(content);
	const f = (new Function(...names, `return convert\`${content}\`;`))(...vals);
	// console.log('dom', f);
	return f.documentElement.querySelector('body');
};

//TODO: How to rerun when data changes?
export function addTextToBody() {
	const div = document.createElement("div");
	// div.textContent = sayHello();

	const row = document.querySelector("#myTable");
	const template = row.innerHTML;

	//TODO: Script injection breaks things, but doesn't execute. There probably is a way to make it do so.
	// div.innerHTML = template.interpolate({
	const dom = template.interpolate({
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

	// document.body.appendChild(document.importNode(dom.documentElement));
	// document.body.appendChild(dom.documentElement);
	const element = document.body.querySelector('.app');
	const newElement = document.importNode(dom, true);
	// element.parentNode.replaceChild(newElement, element);
	// console.log(newElement)
	//element.childNodes = newElement.childNodes;
	// Array.from(newElement.childNodes).map(x => element.appendChild(x));
	
	const frag = document.createDocumentFragment()
	Array.from(newElement.childNodes).map(x => frag.appendChild(x));
	element.innerHTML = '';
	element.appendChild(frag);
}
