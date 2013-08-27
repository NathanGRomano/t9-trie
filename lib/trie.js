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
				list.push(function (curr, next) {
					if (!(key in curr.children)) 
						curr.add(new Node(key, value), function (err, node) {
							if (err) return curr.get(key, next);
							next(null, node);
						});
					else
						curr.get(key, next);
				});
			})(key, last);
		});
		async.waterfall(list, cb);
	});
};

Trie.prototype.find = function (value, cb) {
	var self = this;
	process.nextTick(function () {
		var last = self.root.key
		  , keys = self.buildKey(value) || []
			, list = [
				function (next) { next(null, self.root); }
			];
		keys.forEach(function (key) {
			list.push(function (node, next) {
				node.get(key, next);
			});
		});
		async.waterfall(list, cb);
	});
};

Trie.prototype.buildKey = function (value) {
	return value.toString().split('');
};

module.exports = Trie; 
