# Trying reactish again, but more so

Using custom element api (though not really necessary).

- Currently works in Chrome and Safari. 
	- Expected in Firefox 61 (or >=59 if you enable Custom Elements)

## Running

Open [index.html](./index.html) in a web-browser (http protocol, firefox will if custom elements enabled, but chrome won't work in file protocol).

See [app-row.js](./app-row.js) for component. 
See [temp.module.js](./temp.module.js) to see how data renders through template.

It's a bit unpleasant atm, but may improve.

## TODO

Needs event bindings. Maybe with [tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
Will be integrated with [reactish](https://github.com/bobbigmac/reactish)