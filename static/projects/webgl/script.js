var windowNode = document.getElementById('window');
windowNode.width = window.devicePixelRatio
	* windowNode.offsetWidth;
windowNode.height = window.devicePixelRatio
	* windowNode.offsetHeight;

var gl = windowNode.getContext('webgl2');

// Clear screen
// gl.clearColor(0, 0, 0.4, 1);
// gl.clear(gl.COLOR_BUFFER_BIT);

// Load shaders
var shader = gl.createProgram();
var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, document.getElementById('frag').innerHTML);
gl.compileShader(fragShader);
gl.attachShader(shader, fragShader);
var vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, document.getElementById('vert').innerHTML);
gl.compileShader(vertShader);
gl.attachShader(shader, vertShader);
gl.linkProgram(shader);
gl.validateProgram(shader);
gl.useProgram(shader);
gl.bindAttribLocation(shader, 0, "vertex_in");
// gl.bindAttribLocation(shader, 1, "color_in");

// Load geometry
// var triArray = new Float32Array([-1, -1, 0, 1, -1, 0, 0, 1, 0]);
// var colArray = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
// 
// var buffer = gl.createBuffer();
// gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
// gl.bufferData(gl.ARRAY_BUFFER, triArray.buffer, gl.STATIC_DRAW);
// gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
// gl.enableVertexAttribArray(0);
// 
// var colBuffer = gl.createBuffer();
// gl.bindBuffer(gl.ARRAY_BUFFER, colBuffer);
// gl.bufferData(gl.ARRAY_BUFFER, colArray.buffer, gl.STATIC_DRAW);
// gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);
// gl.enableVertexAttribArray(1);

// gl.drawArrays(gl.TRIANGLES, 0, 3);

var model = new Model("suzanne.obj", render);

function render() {
	model.render();
}

