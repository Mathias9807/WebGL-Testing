class Model {

	constructor(url, doneCallback) {
		this.url = "/static/projects/webgl/models/" + url;
		this.doneCallback = doneCallback;
		this.verts = [];
		this.vao = 0;
		this.vertLength = 0;
		this.ready = false;

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
		var uvs = [];

		var lines = data.split('\n');
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];

			if (line[0] == 'v') {
				var v = line.split(" ");

				verts.push(parseFloat(v[1]));
				verts.push(parseFloat(v[2]));
				verts.push(parseFloat(v[3]));
			}

			if (line.substring(0, 2) == 'vt') {
				var v = line.split(" ");

				uvs.push(parseFloat(v[1]));
				uvs.push(parseFloat(v[2]));
			}
		}

		// Vertex = {x, y, z, u, v}
		var indicesPerVertex = 5;
		var unwrappedVerts = [];
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];

			if (line[0] == 'f') {

				var f = line.split(" ");

				var i0 = f[1].split("/")[0] - 1;
				var i1 = f[2].split("/")[0] - 1;
				var i2 = f[3].split("/")[0] - 1;

				// Add first vertex info
				for (var j = 0; j < 3; j++) {
					unwrappedVerts.push(verts[j + 3 * i0]);
				}
				for (var j = 0; j < 2; j++) {
					unwrappedVerts.push(uvs[j + 2 * i0]);
				}

				// Add second vertex info
				for (var j = 0; j < 3; j++) {
					unwrappedVerts.push(verts[j + 3 * i1]);
				}
				for (var j = 0; j < 2; j++) {
					unwrappedVerts.push(uvs[j + 2 * i1]);
				}

				// Add third vertex info
				for (var j = 0; j < 3; j++) {
					unwrappedVerts.push(verts[j + 3 * i2]);
				}
				for (var j = 0; j < 2; j++) {
					unwrappedVerts.push(uvs[j + 2 * i2]);
				}
			}
		}

		var vertArray = new Float32Array(unwrappedVerts);
		this.vertLength = unwrappedVerts.length / indicesPerVertex;

		this.vao = gl.createVertexArray();
		gl.bindVertexArray(this.vao);

		var buffer0 = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer0);
		gl.bufferData(gl.ARRAY_BUFFER, vertArray.buffer, gl.STATIC_DRAW);

		gl.vertexAttribPointer(0, 3, gl.FLOAT, false,
			indicesPerVertex * 4, 0);
		gl.enableVertexAttribArray(0);

		gl.vertexAttribPointer(1, 2, gl.FLOAT, false,
			indicesPerVertex * 4, 3 * 4);
		gl.enableVertexAttribArray(1);

		this.ready = true;
		if (typeof this.doneCallback === "function")
			this.doneCallback();
	}

	render() {
		if (this.ready === false) return;

		gl.bindVertexArray(this.vao);
		gl.enableVertexAttribArray(0);
		gl.enableVertexAttribArray(1);

		gl.drawArrays(gl.TRIANGLES, 0, this.vertLength);
	}

}

