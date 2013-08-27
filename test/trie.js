var assert = require('assert')
  , Trie = require('../lib/trie')
	, Node = require('../lib/node')

describe('given a trie', function () {
	
	var trie = new Trie();

	describe('when adding a single character', function () {

		it('then it should be added', function (done) {
			
			trie.add('s', function (err, node) {

				assert.equal(err, null);
				assert.equal(node instanceof Node, true);
				assert.equal(node.toString(), 's');
				done();

			});
		});

	});

	describe('when adding a three character word', function () {
		
		it('then it should be added', function (done) {

			trie.add('sit', function (err, node) {

				assert.equal(err, null);
				assert.equal(node instanceof Node, true);
				assert.equal(node.toString(), 'sit');
				done();

			});

		});

	});
	
	describe('when asked to find the single character', function () {

		it('then it should be returned', function (done) {

			trie.find('s', function (err, node) {
				assert.equal(err, null);
				assert.equal(node instanceof Node, true);
				assert.equal(node.toString(), 's');
				done();
			});

		});

	});

	describe('when asked to find a word with two characters', function () {

		it('then it should be returned', function (done) {
			
			trie.find('si', function (err, node) {
				assert.equal(err, null);
				assert.equal(node instanceof Node, true);
				assert.equal(node.toString(), 'si');
				done();
			});

		});

	});

	describe('when asked to find a three character word', function () {

		it('then it should be returned', function (done) {

			trie.find('sit', function (err, node) {
				assert.equal(err, null);
				assert.equal(node instanceof Node, true);
				assert.equal(node.toString(), 'sit');
				done();
			});

		});

	});

});

