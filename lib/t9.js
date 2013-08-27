var Trie = require('./trie');

function T9 () {
	this.trie = new Trie();
}

T9.prototype.load = function (str, cb) {
	
	//TODO @nromano implement me!

	process.nextTick(function () {
		cb(null, 0);;
	});

};

module.exports = T9;
