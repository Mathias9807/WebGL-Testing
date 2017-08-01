var windowNode = document.getElementById('window');
windowNode.width = window.devicePixelRatio
	* windowNode.offsetWidth;
windowNode.height = window.devicePixelRatio
	* windowNode.offsetHeight;

var gl = windowNode.getContext('webgl2');

var render = new Render();

var model = new Model("Simple bake.obj", null);

function loop() {
	try {
		render.render();
	}catch(err) {
		console.log(err);
	}

	setTimeout(loop, 200);
}
loop();

