var async = require('async')
  , Node = require('./node')

function Trie () {
	this.root = new Node('', '');
}

Trie.prototype.add = function (value, cb) {
	var self = this;
	process.nextTick(function () {
		var last = self.root.key
			, keys = self.buildKey(value) || []
			, list = [
				function (next) { next(null, self.root); }
			];
		keys.forEach(function (key) {
			last = last + key;
			(function (key, value) {
				list.push(function (node, next) {
					if (!(key in node.children)) 
						node.add(new Node(key, value), next);
					else
						node.get(key, next);
				});
			})(key, last);
		});
		async.waterfall(list, function (err, node) {
			cb(err, node);	
		});
	});
};

Trie.prototype.find = function (key, cb) {
	var self = this;
	process.nextTick(function () {
		cb(null, null);
	});
};

Trie.prototype.buildKey = function (value) {
	return value.toString().split('');
};

module.exports = Trie; 
