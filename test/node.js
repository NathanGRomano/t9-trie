var assert = require('assert')
  , Node = require('../lib/node')
  , root = new Node('', '');

describe('given a node', function () {

	describe('when adding a child given a key', function () {

		it('it should be stored by the key', function (done) {

			root.add( new Node('T', 'T'), function (err, node) {
				assert.equal(err, null);
				assert.equal(node instanceof Node, true);
				done();
			}); 

		});

	});

	describe('when asked if we have children given a key', function () {

		it('should return a list given the key', function (done) {

			root.get('T', function (err, node) {
				assert.equal(err, null);
				assert.equal(node instanceof Node, true);
				assert.equal(node.key, 'T');
				done();
			});

		});

	});

});
