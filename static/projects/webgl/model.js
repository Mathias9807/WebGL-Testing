class Model {

	constructor(url, doneCallback) {
		this.url = "/static/projects/webgl/models/" + url;
		this.doneCallback = doneCallback;
		this.verts = [];
		this.vao = 0;
		this.vertLength = 0;

		// Download the model
		var xhttp = new XMLHttpRequest();
		model = this;
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				model.parseOBJ(xhttp.responseText);
			}
		};
		xhttp.open("GET", this.url);
		xhttp.send();
	}

	parseOBJ(data) {
		var verts = [];

		var lines = data.split('\n');
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];

			if (line[0] == 'v') {
				var v = line.split(" ");

				verts.push(parseFloat(v[1]));
				verts.push(parseFloat(v[2]));
				verts.push(parseFloat(v[3]));
			}
		}

		var unwrappedVerts = [];
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];

			if (line[0] == 'f') {

				var f = line.split(" ");

				var i0 = f[1].split("/")[0] - 1;
				var i1 = f[2].split("/")[0] - 1;
				var i2 = f[3].split("/")[0] - 1;

				for (var j = 0; j < 3; j++)
					unwrappedVerts.push(verts[j + 3 * i0]);

				for (var j = 0; j < 3; j++)
					unwrappedVerts.push(verts[j + 3 * i1]);

				for (var j = 0; j < 3; j++)
					unwrappedVerts.push(verts[j + 3 * i2]);
			}
		}

		// var vertArray = new Float32Array([-1, -1, 0, 1, -1, 0, 0, 1, 0]);
		// var colArray = new Float32Array([1, 0, 0, 0, 1, 0, 1, 0, 1]);
		// var indexArray = new Uint8Array([0, 1, 2]);

		var vertArray = new Float32Array(unwrappedVerts);
		this.vertLength = unwrappedVerts.length;

		this.vao = gl.createVertexArray();
		gl.bindVertexArray(this.vao);

		var buffer0 = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer0);
		gl.bufferData(gl.ARRAY_BUFFER, vertArray.buffer, gl.STATIC_DRAW);
		gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(0);

		// var buffer1 = gl.createBuffer();
		// gl.bindBuffer(gl.ARRAY_BUFFER, buffer1);
		// gl.bufferData(gl.ARRAY_BUFFER, colArray.buffer, gl.STATIC_DRAW);
		// gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);
		// gl.enableVertexAttribArray(1);

		// var bufferI = gl.createBuffer();
		// gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferI);
		// gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexArray.buffer, gl.STATIC_DRAW);

		this.doneCallback();
	}

	render() {
		gl.bindVertexArray(this.vao);

		gl.drawArrays(gl.TRIANGLES, 0, this.vertLength / 3);
	}

}

