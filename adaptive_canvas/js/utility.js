/*
** File Name:	utility.js
** Author:	Aditya Ramesh
** Date:	03/18/2014
** Contact:	_@adityaramesh.com
*/

/*
** This is a utility function that should be used for creating classes. The
** object returned by this function is designed such that both of the examples
** below return instances of the class.
**
** 	// Define the `widget` class.
** 	var widget = make_class();
** 	widget.prototype.init = function() { ... };
** 	...
**
** 	// User code.
** 	var w1 = new widget();
** 	var w2 = widget();
**
** Without the use this function, only `w1` would return an instance of
** `widget`, and `w2` would be undefined. This implementation of the
** `make_class` function follows closely to the one given by John Resig
** [here](http://ejohn.org/blog/simple-class-instantiation/)
*/

function make_class()
{
	/*
	** Note that we cannot use strict mode here because of the use of
	** `arguments.callee`.
	*/
	return function(args)
	{
		/*
		** Only take this branch if we this function was instantiated
		** using `new`.
		*/
		if (this instanceof arguments.callee) {
			if (typeof this.init === "function") {
				this.init.apply(this, args.callee ? args : arguments);
			}
		}
		else {
			return new arguments.callee(arguments);
		}
	};
}

/*
** This function allows the `window.requestAnimationFrame` and
** `window.cancelAnimationFrame` methods to be used in a portable way. The
** implementation is adapted from the one given
** [here](http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/),
** by Paul Irish.
*/

(function()
{
	"use strict";

	var vendors = ["webkit", "moz"];
	for (var i = 0; i !== vendors.length && !window.requestAnimationFrame; ++i) {
		window.requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame =
			window[vendors[i] + 'CancelAnimationFrame'] ||
			window[vendors[i] + 'CancelRequestAnimationFrame'];
	}

	/*
	** Things to try out in the future in order to get more accurate
	** callback timings.
	** 1. Use a running window of samples and compute the average.
	** 2. Train a model using running data. The model should adjust the
	** timings proactively, in order to compensate for the occasional frames
	** that do extra computation.
	*/
	
	var prev = 0;
	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = function(callback, element)
		{
			var cur = new Date().getTime();
			var rate = Math.max(0, 16 - (cur - prev));
			var id = window.setTimeout(function()
			{
				callback(cur + rate);
			}, rate);
			prev = cur + rate;
			return id;
		};
	}

	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function(id)
		{
			clearTimeout(id);
		};
	}
}());
