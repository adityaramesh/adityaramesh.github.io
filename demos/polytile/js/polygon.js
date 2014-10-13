/*
** File Name: polygon.js
** Author:    Aditya Ramesh
** Date:      10/13/2014
** Contact:   _@adityaramesh.com
*/

function render(ctx, w, h, state)
{
	ctx.fillStyle = "gray";
	ctx.fillRect(0, 0, w, h);
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
			"virtual_size": [s, s],
			"fit_to": "viewport"
		});
		ctx = can.getContext("2d");
		render(ctx, dim, dim, state);
	});
	$(window).trigger("resize");
});
