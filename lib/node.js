function Node (key, value) {
	this.key = key;
	this.value = value;
	this.children = {};
}

Node.prototype.add = function (node, cb) {
	var self = this;
	process.nextTick(function () {
		(self.children[node.key] = self.children[node.key] || []).push(node);
		cb(null, node);
	});
};

Node.prototype.get = function (key, cb) {
	process.nextTick(function () {
		cb(null, false);
	});
};

module.exports = Node;
