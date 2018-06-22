
function unEntity(str){
   return str
   			.replace(/&amp;/g, "&")
			.replace(/&lt;/g, "<")
			.replace(/&gt;/g, ">")
			.replace(/&quot;/g, "\"");
}

//blech
(function(join) {
	Array.prototype.join = function(sep) { return join.call(this, sep || '') };
})(Array.prototype.join);

String.prototype.interpolate = function(params) {
  const names = Object.keys(params);
  const vals = Object.values(params);
  const content = unEntity(this);

  //bleeecccchhhh
  // console.log(content);
  const f = new Function(...names, `return \`${content}\`;`)(...vals);
  // console.log(f);
  return f;
}

//TODO: How to rerun when data changes?
export function addTextToBody() {
	const div = document.createElement('div');
	// div.textContent = sayHello();

	const row = document.querySelector('#myTable');
	const template = row.innerHTML;
	
	//TODO: Script injection breaks things, but doesn't execute. There probably is a way to make it do so.
	div.innerHTML = template.interpolate({
		title: "Hello World",
		rows: [
			{
				title: 'Row 1',
				text: 'Row 1 text'
			},
			{
				title: 'Row 2',
				text: 'Row 2 text'
			}
		]
	});

	document.body.appendChild(div);
}