var async = require('async')
  , Trie = require('./trie')
  , cpus = require('os').cpus().length || 1

function T9 () {
	this.trie = new Trie();
}

T9.prototype.load = function (str, cb) {
	var self = this;
	process.nextTick(function () {
		var i = 0
			, wordCount = 0
			,	q = async.queue(function (word, next) {
					self.trie.add(word, function (err, node) {
						if (err) console.warn(err.toString());
						if (!err) wordCount++;
						next();
					});
				}, cpus)
			, getWord = function () {
					var word = '', char;
					while(i <= str.length) {
						char = str.charAt(i);
						i++;
						if (char != ' ') word += char; 
						if (char == ' ' || i == str.length) {
							q.push(word);
							process.nextTick(function () {
								getWord();
							});
							break;
						}
					}
				};

		q.drain = function () {
			cb(null, wordCount);
		};

		getWord();

	});

};

T9.prototype.lookup = function (key, cb) {
	process.nextTick(function () {
		cb(null, []);
	});
};

module.exports = T9;
