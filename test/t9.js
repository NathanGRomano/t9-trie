var assert = require('assert') 
  , T9 = require('../lib/t9')
  , t9 = new T9();

describe('given a t9 instance', function () {

	describe('when adding a string of words', function (done) {

		it('should add the words', function (done) {

			t9.load('cat dog food iced coffee soup watch knife key car pizza tacos', function (err, count) {
				assert.equal(err, null);
				assert.equal(count, 12); 
				done();

			});

		});

	});

	describe('when translating numbers to chars', function () {
		it('should translate it into [ ["a","b","c"], ["a","b","c"], ["t","u","v"] ]', function (done) {
			var expect = [ ["a","b","c"], ["a","b","c"], ["t","u","v"] ];
			var res = T9.numbersToChars('228');
			assert.deepEqual(res, expect);
			done();	
		});
	});

	describe('when translating chars to numbers', function  () {
		it('should translate "cat" into "228"', function (done) {
			var res = T9.charsToNumbers('cat')
			assert.equal(res, '228');
			done();
		});

	});

	describe('when looking for suggestions provided the input "228"', function () {

		it('should provide us a node with the word "cat" as the value', function (done) {

			t9.lookup('228', function (err, node) {

				assert.equal(node.toString(), 'cat');

				done();

			});

		});

	});

	describe('when looking for suggestions provided the input "5"', function () {

		it('should provide us a node with the character "k" as the value and 2 children nodes that are "kn" and "k"', function (done) {

			t9.lookup('5', function (err, node) {
				assert.equal(node.toString(), 'k');
				node.get('3', function (err, a) {
					assert.equal(a.toString(), 'ke');
					node.get('6', function (err, b) {
						assert.equal(b.toString(), 'kn');
						done();
					});
				});
			});

		});

	});

});
