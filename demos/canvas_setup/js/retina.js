/*
** File Name:	retina.js
** Author:	Aditya Ramesh
** Date:	03/18/2014
** Contact:	_@adityaramesh.com
*/

function backing_scale(ctx) {
	if ("devicePixelRatio" in window && window.devicePixelRatio > 1) {
		return window.devicePixelRatio;
	}
	return 1;
}

function render(ctx, text) {
	ctx.fillStyle = "gray";
	ctx.strokeStyle = "black";
	ctx.fillRect(0, 0, 256, 256);
	ctx.strokeRect(0, 0, 256, 256);
	ctx.arc(128, 128, 50, 0, 2 * Math.PI);
	ctx.stroke();

	ctx.fillStyle = "black";
	ctx.font = "16px Palatino";
	ctx.fillText(text, (256 - ctx.measureText(text).width) / 2, 40);
}

$(window).ready(function() {
	var can1 = document.getElementById("canvas_1");
	var ctx1 = can1.getContext("2d");
	can1.width = 256;
	can1.height = 256;
	render(ctx1, "Naive Canvas");

	var can2 = document.getElementById("canvas_2");
	var ctx2 = can2.getContext("2d");
	var s = backing_scale(ctx2);
	can2.width = s * 256;
	can2.height = s * 256;
	can2.style.width = "256px";
	can2.style.height = "256px";
	ctx2 = can2.getContext("2d");
	ctx2.scale(s, s);
	render(ctx2, "Scaled Canvas");
});
