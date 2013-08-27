var assert = require('assert')
  , Node = require('../lib/node')
  , root = new Node('1', 'One');

describe('given a node', function () {

	describe('when adding a child given a key', function () {

		it('it should be stored by the key', function (done) {

			root.add( new Node('2', 'Two'), function (err, node) {
				assert.equal(err, null);
				assert.equal(node instanceof Node, true);
				done();
			}); 

		});

	});

	describe('when asked if we have children given a key', function () {

		it('should return a list given the key', function (done) {

			root.get( '2', function (err, node) {

				assert.equal(err, null);
				assert.equal(node instanceof Node, true);
				done();

			});

		});

	});

});
