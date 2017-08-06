var windowNode = document.getElementById('window');
windowNode.width = window.devicePixelRatio
	* windowNode.offsetWidth;
windowNode.height = window.devicePixelRatio
	* windowNode.offsetHeight;

var keys = [];
keys["w"] = keys["a"] = keys["s"] = keys["d"] = keys[" "] = keys["shift"] = false;
keys["arrowright"] = keys["arrowleft"] = false;

var gl = windowNode.getContext('webgl2');

var render = new Render();

var camera = new Camera();
camera.pos[1] = 0.5;
camera.pos[2] = 5;

// camera.rot[0] = -0.5;
// camera.rot[1] = 0.1;

var model = new Model("Simple bake.obj", null);

function loop() {
	var dTime = 0.01;

	camera.moveForward((keys["w"] - keys["s"]) * 10 * dTime);
	camera.moveRight((keys["d"] - keys["a"]) * 10 * dTime);

	camera.rot[1] -= (keys["arrowright"] - keys["arrowleft"]) * 3 * dTime;

	try {
		render.render(camera);
	}catch(err) {
		console.log(err);
	}

	setTimeout(loop, dTime * 1000);
}
loop();

function keyPressed(e) {
	keys[e.key.toLowerCase()] = true;
}
document.addEventListener("keydown", keyPressed);

function keyReleased(e) {
	keys[e.key.toLowerCase()] = false;
}
document.addEventListener("keyup", keyReleased);

