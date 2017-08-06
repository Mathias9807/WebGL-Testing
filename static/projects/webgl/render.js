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

		this.shader = shader;
	}

	setParam3f(uniform, vec) {
		var loc = gl.getUniformLocation(this.shader, uniform);
		gl.uniform3fv(loc, vec);
	}

	setParam4x4f(uniform, mat) {
		var loc = gl.getUniformLocation(this.shader, uniform);
		gl.uniformMatrix4fv(loc, false, mat);
	}

	render(camera) {
		// Clear screen
		gl.clearColor(1, 1, 1, 1);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		this.setParam4x4f("mat_proj", camera.getProjMatrix());
		this.setParam4x4f("mat_world", camera.getWorldMatrix());

		var modelMat = mat4.create();
		mat4.fromScaling(modelMat, vec3.fromValues(0.5, 0.5, 0.5));
		this.setParam4x4f("mat_model", modelMat);

		model.render();
	}

}

class Camera {

	constructor() {
		this.pos = vec3.create();
		this.rot = vec3.create();

		this.fov = 90 * 3.1415926535 / 180;
	}

	moveForward(d) {
		this.pos[2] += d * -Math.cos(this.rot[1]);
		this.pos[0] += d * -Math.sin(this.rot[1]);
	}

	moveRight(d) {
		this.pos[0] += d * Math.cos(this.rot[1]);
		this.pos[2] += d * -Math.sin(this.rot[1]);
	}

	getWorldMatrix() {
		var world = mat4.create();

		mat4.rotateZ(world, world, -this.rot[2]);
		mat4.rotateX(world, world, -this.rot[0]);
		mat4.rotateY(world, world, -this.rot[1]);

		var trans = vec3.create();
		vec3.negate(trans, this.pos);
		mat4.translate(world, world, trans);

		return world;
	}

	getProjMatrix() {
		var proj = mat4.create();

		var aspect = windowNode.width / windowNode.height;
		mat4.perspective(proj, this.fov / aspect, aspect, 0.001, 100);

		return proj;
	}

}

