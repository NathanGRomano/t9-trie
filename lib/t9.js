var Trie = require('./trie');

var a = module.exports = function () {
	this.trie = new Trie();
}

a.prototype.load = function (str, cb) {
	
	//TODO @nromano implement me!

	process.nextTick(function () {
		cb(null, 0);;
	});

}
