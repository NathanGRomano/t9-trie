function Trie () {

}

Trie.prototype.add = function (node, cb) {
	var self = this;
	process.nextTick(function () {
		cb(null, false);
	});
};

Trie.prototype.find = function (key, cb) {
	var self = this;
	process.nextTick(function () {
		cb(null, []);
	});
};

module.exports = Trie; 
