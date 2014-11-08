/*
** File Name: polygon.js
** Author:    Aditya Ramesh
** Date:      10/13/2014
** Contact:   _@adityaramesh.com
*/

function repaint(can, ctx, state)
{
	dim = Math.min(window.innerWidth, window.innerHeight);
	bounds = [window.innerWidth, window.innerHeight - $("#options").height()];
	reshape_canvas(can, {
		"virtual_size": [dim, dim],
		"fit_to": bounds
	});
	ctx = can.getContext("2d");
	render(ctx, dim, dim, state);
}

function initialize_ui(can, ctx, state)
{
	$("#sides_slider").slider({
		value: state["sides"],
		min: 3,
		max: 16,
		step: 1,
		slide: function(event, ui) {
			$("#sides").text(ui.value);
			state["sides"] = ui.value;
			repaint(can, ctx, state);
		}
	});

	$("#angle_slider").slider({
		value: state["angle"],
		min: 0,
		max: 120,
		step: 1,
		slide: function(event, ui) {
			$("#angle").text(ui.value + "°");
			state["angle"] = ui.value;
			repaint(can, ctx, state);
		}
	});

	$("#thickness_slider").slider({
		value: state["thickness"],
		min: 1,
		max: 5,
		step: 1,
		slide: function(event, ui) {
			$("#thickness").text(ui.value);
			state["thickness"] = ui.value;
			repaint(can, ctx, state);
		}
	});

	$("#sides").text($("#sides_slider").slider("value"));
	$("#angle").text($("#angle_slider").slider("value") + "°");
	$("#thickness").text($("#thickness_slider").slider("value"));
}

function render(ctx, w, h, state)
{
	ctx.fillStyle = "black";
	ctx.lineWidth = state["thickness"];

	var sides = state["sides"];
	var theta = 2 * Math.PI / sides;
	var init = state["angle"] * Math.PI / 180;

	var cx = w / 2;
	var cy = h / 2;
	var r = Math.min(w, h) / 5;

	ctx.beginPath();
	ctx.moveTo(
		cx + r * Math.cos(Math.PI / 2 + init),
		cy - r * Math.sin(Math.PI / 2 + init)
	);
	for (n = 1; n != sides; ++n) {
		ctx.lineTo(
			cx + r * Math.cos(Math.PI / 2 + init + n * theta),
			cy - r * Math.sin(Math.PI / 2 + init + n * theta)
		);
	}
	ctx.closePath();
	ctx.stroke();
}

$(window).ready(function() {
	var dim = 0;
	var state = {"sides": 6, "angle": 0, "thickness": 1};
	var can = document.getElementById("canvas");
	var ctx = null;

	initialize_ui(can, ctx, state);
	$(window).on("resize orientationchange", function() {
		repaint(can, ctx, state);
	});
	$(window).trigger("resize");
});