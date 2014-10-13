/*
** File Name: polygon.js
** Author:    Aditya Ramesh
** Date:      10/13/2014
** Contact:   _@adityaramesh.com
*/

function render(ctx, w, h, state)
{
	ctx.fillStyle = "black";
	ctx.lineWidth = 5;

	var sides = 6;
	var theta = 2 * Math.PI / sides;

	var cx = w / 2;
	var cy = h / 2;
	var r = Math.min(w, h) / 5;

	ctx.beginPath();
	ctx.moveTo(cx, cy + r);
	for (n = 1; n != sides; ++n) {
		ctx.lineTo(
			cx + r * Math.cos(Math.PI / 2 + n * theta),
			cy + r * Math.sin(Math.PI / 2 + n * theta)
		);
	}
	ctx.closePath();
	ctx.stroke();
}

function initialize_ui()
{
	$("#sides_slider").slider({
		value: 6,
		min: 3,
		max: 16,
		step: 1,
		slide: function(event, ui) {
			$("#sides").val(ui.value);
		}
	});

	$("#angle_slider").slider({
		value: 0,
		min: 0,
		max: 60,
		step: 1,
		slide: function(event, ui) {
			$("#angle").val(ui.value + "°");
		}
	});

	$("#thickness_slider").slider({
		value: 1,
		min: 1,
		max: 5,
		step: 1,
		slide: function(event, ui) {
			$("#thickness").val(ui.value);
		}
	});

	$("#sides").val($("#sides_slider").slider("value"));
	$("#angle").val($("#angle_slider").slider("value"));
	$("#thickness").val($("#thickness_slider").slider("value"));
}

$(window).ready(function() {
	initialize_ui();

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
