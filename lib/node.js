function Node (key, value) {
	this.key = key;
	this.value = value;
	this.children = {};
}

Node.prototype.add = function (node, cb) {
	var self = this;
	process.nextTick(function () {
		if (node.key in self.children) return cb(new Error('Child already exists'));
		self.children[node.key] = node;
		cb(null, node);
	});
};

Node.prototype.get = function (key, cb) {
	var self = this;
	process.nextTick(function () {
		if (key in self.children) return cb(null, self.children[key]);
		cb(new Error('Child does not exist'));
	});
};

module.exports = Node;
