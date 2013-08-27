var Node = require('./node');

function Trie () {
	this.root = new Node('', '');
}

Trie.prototype.add = function (value, cb) {
	var self = this;
	process.nextTick(function () {
		(self.buildKey(value) || []).forEach(function (key) {
		});
		cb(null, false);
	});
};

Trie.prototype.find = function (key, cb) {
	var self = this;
	process.nextTick(function () {
		cb(null, []);
	});
};

Trie.prototype.buildKey = function (value) {
	return value.split('');
};

module.exports = Trie; 
