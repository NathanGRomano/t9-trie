function Node (key, value) {
	this.key = key;
	this.value = value;
	this.children = {};
}

Node.prototype.add = function (node, cb) {
	process.nextTick(function () {
		cb(null, false);
	});
};

Node.prototype.get = function (key, cb) {
	process.nextTick(function () {
		cb(null, false);
	});
};

module.exports = Node;
