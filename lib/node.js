function Node (key, value) {
	this.key = key;
	this.value = value;
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
