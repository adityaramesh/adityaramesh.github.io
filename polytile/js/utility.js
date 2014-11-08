/*
** File Name: utility.js
** Author:    Aditya Ramesh
** Date:      10/13/2014
** Contact:   _@adityaramesh.com
*/

function make_class()
{
	return function(args)
	{
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
