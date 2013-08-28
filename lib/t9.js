var async = require('async')
  , Trie = require('./trie')
  , cpus = require('os').cpus().length || 1

function T9 () {
	
	//our trie instance
	var trie = this.trie = new Trie();

	//we want a custom way generating a key instead of the default, so we will convert the value to a number
	trie.keyIt = function (value) {
		return T9.charsToNumbers(value) || value;
	};

}

T9.numbersToChars = function (numbers) {
	var map = this.numbersToChars.map, lists = [];
	numbers.toString().split('').forEach(function (digit) {
		var list = map[digit] || [];
		if (list.length) lists.push(list);
	});
	return lists;
};

T9.numbersToChars.map = {
	0: ['+'],
	1: [''],
	2: ['a', 'b', 'c'],
	3: ['d', 'e', 'f'],
	4: ['g', 'h', 'i'],
	5: ['j', 'k', 'l'],
	6: ['m', 'n', 'o'],
	7: ['p', 'q', 'r', 's'],
	8: ['t', 'u', 'v'],
	9: ['w', 'x', 'y', 'z']
};

T9.charsToNumbers = function (chars) {
	var map = this.charsToNumbers.map, numbers = [];
	chars.toString().split('').forEach(function (char) {
		var num = map[char];
		if (num) numbers.push(num);
	});
	return numbers.join('');
};

T9.charsToNumbers.map = {};

(function () {
	var ntc = T9.numbersToChars.map
	  , ctn = T9.charsToNumbers.map;
	for (var k in ntc) {
		ntc[k].forEach(function (c) {
			ctn[c] = k;	
		});
	}
})();

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

T9.prototype.lookup = function (input, cb) {
	this.trie.find(input, cb);
};

module.exports = T9;
