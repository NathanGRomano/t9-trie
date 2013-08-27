var assert = require('assert')
  , Trie = require('../lib/trie')
	, Node = require('../lib/node')
  , trie = new Trie()

describe('given a trie', function () {

	describe('when adding a node', function () {

		it('then should be added', function (done) {
			
			trie.add(new Node('some value'), function (err, node) {

				assert.equal(err, null);
				assert.equal(node instanceof Node, true);
				assert.equal(node.value === 'some value', true);
				done();

			});
		});

	});
	
	describe('when asked to find a node', function () {

		it('then should be returned', function () {

			trie.find('some key', function (err, node) {
				assert.equal(err, null);
				assert.equal(node instanceof Node, true);
				assert.equal(node.value === 'some value', true);
				done();
			});

		});

	});

});

