# React-like reactive custom elements

Using custom element api

- Currently works in Chrome and Safari. 
	- Expected in Firefox 61 (or >=59 if you enable Custom Elements)

## Running

Open [index.html](./index.html) in a web-browser (http protocol)

See [app-list.js](./app-list.js) for simple component

See [app-row.js](./app-row.js) for advanced component

See [reactish.module.js](./temp.module.js) to see how data renders through template

Has event bindings somewhat similar to Blaze, bound via selectors after the template content has been rendered.
- Upside: Event handlers are not defined inline
- Downside: Event handlers are not defined inline
