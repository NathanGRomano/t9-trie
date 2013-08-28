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

	describe('when looking for suggestions provided the input "228"', function () {

		it('should provide us a list with the word "cat"', function (done) {

			t9.lookup('228', function (err, results) {
				
				assert.equal(results instanceof Array, true);
				assert.equal(results.indexOf('cat') >=0, true);

				done();

			});

		});

	});

});
