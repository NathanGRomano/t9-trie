var async = require('async')
  , Node = require('./node')

function Trie () {
	this.root = new Node('', '');
}

Trie.prototype.add = function (value, cb) {
	var self = this;
	process.nextTick(function () {
		var last = self.root.value
			, keys = self.getKeys(self.breakdown(value))
			, list = [
				function (next) { next(null, self.root); }
			];
		keys.forEach(function (key) {
			last = last + key.orig;
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
			})(key.value, last);
		});
		async.waterfall(list, cb);
	});
};

Trie.prototype.find = function (value, cb) {
	var self = this;
	process.nextTick(function () {
		var last = self.root.key
		  , keys = self.getKeys(self.breakdown(value))
			, list = [
				function (next) { next(null, self.root); }
			];
		keys.forEach(function (key) {
			list.push(function (node, next) {
				node.get(key.value, next);
			});
		});
		async.waterfall(list, cb);
	});
};

Trie.prototype.breakdown = function (value) {
	return value.toString().split('');
};

Trie.prototype.getKeys = function (values) {
	var self = this, keys = [];
	values.forEach(function (v) {
		keys.push({value:self.keyIt(v), orig:v});
	});
	return keys;
};

Trie.prototype.keyIt = function (value) {
	return value;
};

module.exports = Trie; 
