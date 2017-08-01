class Render {

	constructor() {
		gl.enable(gl.DEPTH_TEST);

		// Load shaders
		var shader = gl.createProgram();
		var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(fragShader, document.getElementById('frag').innerHTML);
		gl.compileShader(fragShader);
		console.log(gl.getShaderInfoLog(fragShader));
		gl.attachShader(shader, fragShader);
		var vertShader = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(vertShader, document.getElementById('vert').innerHTML);
		gl.compileShader(vertShader);
		console.log(gl.getShaderInfoLog(vertShader));
		gl.attachShader(shader, vertShader);
		gl.linkProgram(shader);
		gl.validateProgram(shader);
		gl.useProgram(shader);
		gl.bindAttribLocation(shader, 0, "vertex_in");
		gl.bindAttribLocation(shader, 1, "uv_in");
	}

	render() {
		// Clear screen
		gl.clearColor(1, 1, 1, 0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		model.render();
	}

}

