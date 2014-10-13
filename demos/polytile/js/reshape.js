/*
** File Name: reshape.js
** Author:    Aditya Ramesh
** Date:      10/13/2014
** Contact:   _@adityaramesh.com
*/

function backing_scale() {
	if ("devicePixelRatio" in window && window.devicePixelRatio > 1) {
		return window.devicePixelRatio;
	}
	return 1;
}

/*
** This function reshapes a canvas element by:
**   - Adapting it for retina displays.
**   - Rescaling the coordinate system to correspond to a given virtual width
**   and height.
**   - Scaling the physical CSS size of the canvas so that it either fits within
**   the browser viewport or a given region, or so that each pixel in the canvas
**   corresponds to a physical pixel on the display.
**
** This function does not return anything.
**
** The `options` parameter must contain the following keys:
**   - `canvas`: The canvas to reshape.
**   - `virtual_size`: A two-element integer array containing the virtual width,
**   followed by the virtual height.
**   - `fit_to`: This key is described below.
**
** The optional `keep_aspect_ratio` boolean key is true by default. Its purpose
** is described below, along with that of the `fit_to` key.
**
** The `fit_to` parameter can be one of the following:
**   - `"viewport"`: Scales the canvas to fit within the browser viewport. If
**   `keep_aspect_ratio` is true, then at least one of the dimensions of the
**   canvas will be equal to the corresponding dimension of the viewport. If
**   `keep_aspect_ratio` is false, then both dimensions of the canvas will match
**   those of the browser viewport.
**   - A two-element integer array describing the dimensions of a CSS rectangle.
**   The functionality is the same as that of the `viewport` key, except that in
**   this case, the dimensions of the target region are explicitly given.
**   - `"pixels"`: Scales the canvas so that each virtual pixel corresponds to a
**   physical pixel on the display. For example, if `virtual_size = [256, 256]`
**   and `window.devicePixelRatio = 2`, then the CSS width of the canvas will be
**   set to 128x128. Obviously, the `keep_aspect_ratio` parameter plays no role
**   in this case.
*/
function reshape_canvas(can, options)
{
	var ctx = can.getContext("2d");
	var dim = backing_scale(ctx);
	var vsize = options.virtual_size;
	var keep_ar = true;

	if ("keep_aspect_ratio" in options) {
		keep_ar = options.keep_aspect_ratio;
	}

	var fit_viewport = typeof options.fit_to === "string" &&
		options.fit_to == "viewport";

	if (fit_viewport || typeof options.fit_to === "object") {
		var css_size = [window.innerWidth, window.innerHeight];
		if (!fit_viewport) {
			css_size = options.virtual_size;
		}
		if (keep_ar) {
			// Determine which dimension can be set to the
			// corresponding dimension of the target CSS region, and
			// which needs to be scaled down, in order to mainain
			// the aspect ratio determined by `vsize`.
			var wr = css_size[0] / vsize[0];
			var hr = css_size[1] / vsize[1];
			if (Math.round(wr * vsize[1]) <= css_size[1]) {
				can.width = dim * css_size[0];
				can.height = dim * Math.round(wr * vsize[1]);
				can.style.width = css_size[0] + "px";
				can.style.height = Math.round(wr * vsize[1]) + "px";
				ctx = can.getContext("2d");
				ctx.scale(can.width / vsize[0], can.width / vsize[0]);
			}
			else {
				can.height = dim * css_size[1];
				can.width = dim * Math.round(hr * vsize[0]);
				can.style.height = css_size[1] + "px";
				can.style.width = Math.round(hr * vsize[0]) + "px";
				ctx = can.getContext("2d");
				ctx.scale(can.height / vsize[1], can.height / vsize[1]);
			}
		}
		else {
			can.width = dim * css_size[0];
			can.height = dim * css_size[1];
			can.style.width = css_size[0] + "px";
			can.style.height = css_size[1] + "px";
			ctx = can.getContext("2d");
			ctx.scale(can.width / vsize[0], can.height / vsize[1]);
		}
	}
	else if (options.fit_to === "pixels") {
		if (vsize[0] % dim !== 0 || vsize[1] % dim !== 0) {
			throw "Cannot fit to pixel resolution: 'vsize' is not \
				a multiple of the device pixel ratio";
		}
		can.width = vsize[0];
		can.height = vsize[1];
		can.style.width = vsize[0] / dim + "px";
		can.style.height = vsize[1] / dim + "px";
		ctx = can.getContext("2d");
	}
}
