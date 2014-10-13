/*
** File Name: polygon.js
** Author:    Aditya Ramesh
** Date:      10/13/2014
** Contact:   _@adityaramesh.com
*/

function render(ctx, w, h, state)
{
	ctx.fillStyle = "black";

	var sides = 6;
	var theta = (sides - 2) * Math.PI / sides;

	var cx = w / 2;
	var cy = h / 2;
	var r = Math.min(w, h) / 10;

	ctx.beginPath();
	ctx.moveTo(cx, cy + r);
	for (n = 1; n != sides; ++n) {
		ctx.lineTo(
			cx + r * Math.cos(Math.PI / 2 + n * theta),
			cy + r * Math.sin(Math.PI / 2 + n * theta)
		);
	}
	ctx.closePath();
	ctx.draw();
}

$(window).ready(function() {
	var dim = 0;
	var state = {};
	var can = document.getElementById("canvas");
	var ctx = null;

	$(window).on("resize orientationchange", function() {
		// By setting the virtual drawing region to a square with the
		// following side length, we avoid unnecessary scaling.
		dim = Math.min(window.innerWidth, window.innerHeight);
		reshape_canvas(can, {
			"virtual_size": [dim, dim],
			"fit_to": "viewport"
		});
		ctx = can.getContext("2d");
		render(ctx, dim, dim, state);
	});
	$(window).trigger("resize");
});
