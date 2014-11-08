/*
** File Name: tile.js
** Author:    Aditya Ramesh
** Date:      10/13/2014
** Contact:   _@adityaramesh.com
*/

/*
** For triangular tilings, a primitive represents the center of a cluster of six
** triangles. For square tilings, a primitive represents the bottom-right corner
** of a square. For hexagonal tilings, a primitive represents a cluster of three
** hexagons.
*/
var node = make_class();

node.prototype.init = function(size)
{
	this.drawn = false;
	this.coordinates = new Array(size);
	this.neighbors = new Array(size);
}

function make_primitive_graph(size, rows, cols)
{
	if (size == 3 || size == 6) {
		var head = new node(6);
		var cur = head;
		for (j = 0; j != cols; ++j) {
			var next = new node(6);
			cur.neighbors[4] = next;
			next.neighbors[1] = cur;
			cur = next;
		}
		for (i = 0; i != rows - 1; ++i) {
			var cur_parent = head;
			var cur_head = new node(6);
			cur_parent.neighbors[2] = cur_head;
			cur_head.neighbors[5] = cur_parent;

			var cur = cur_head;
			for (j = 0; j != Math.max(0, cols - 2); ++j) {
				var next = new node(6);
				cur.neighbors[4] = next;
				next.neighbors[1] = cur;

				cur_parent.neighbors[3] = next;
				next.neighbors[0] = cur_parent;
				
				cur_parent = cur_parent.neighbors[4];
				cur_parent.neighbors[2] = next;
				next.neighbors[5] = cur_parent;
				cur = next;
			}

			cur_
		}
	}
}
