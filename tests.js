// Create some sample data
var sample = [{'year': 2004, 'count': 20},
	      {'year': 2006, 'count': 3},
	      {'year': 2007, 'count': 43},
	      {'year': 2008, 'count': 25},
	      {'year': 2010, 'count': 2}];

var dutils = require('./data-utils.js');
var assert = require('chai').assert;

// Find
var testFind = dutils.find(sample, 'count', 20);
assert.deepEqual(testFind,
		 {'year': 2004, 'count': 20},
		 "Find doesn't return an accurate result.");
assert.equal(dutils.find(sample, 'count', 100),
	     -1,
	     "Find doesn't return -1 for no result");


// Copy
assert.deepEqual(dutils.copy(sample), sample,
		 "Copy isn't giving an exact copy.");

// Select
assert.deepEqual(dutils.select(sample, 'year'),
		[2004, 2006, 2007, 2008, 2010],
		'Select is not working properly');


// Fill
var test1 = dutils.fill(sample, 'year', {'count': 0});
var test2 = dutils.fill(sample, 'year', {'count': 0}, 2012);
var test3 = dutils.fill(sample, 'year', {'count': 0}, 2001);
var test4 = dutils.fill(sample, 'year', {'count': 0}, 2001, 2012);

assert.deepEqual(dutils.select(test1, 'year'),
	     [2004, 2005, 2006, 2007, 2008, 2009, 2010],
	     "Fill does not fill in value properly without start and end values.");
assert.deepEqual(dutils.select(test1, 'count'),
		 [20, 0, 3, 43, 25, 0, 2],
		 "Fill does not handle other values correctly.");
assert.equal(test2[test2.length-1].year, 2012,
	     "Fill does not handle end parameter correctly.");
assert.equal(test3[0].year, 2001,
	     "Fill does not handle start parameter correclty.");
assert.equal(test4[0].year, 2001,
	     "Fill doesn't handle start parameter well when there is an end " +
	     "parameter present.");

// Cumulative
var test5 = dutils.cumulative(sample, 'count', 'cumCount');
var test6 = dutils.cumulative(sample, 'count', 'cumCount', 200);
assert.equal(test5.length, sample.length,
	     "Cumulative counting not keeping all data points.");
assert.deepEqual(dutils.select(test5, 'cumCount'),
		 [20, 23, 66, 91, 93],
		 "Cumulative counting give inaccurate result.");
assert.equal(dutils.select(test6, 'cumCount')[0],
	     220,
	     "Cumulative count baseline not taken into account.");


// Percent Growth
var test7 = dutils.percentGrowth(test5, 'cumCount', 'perGro');
var test8 = dutils.percentGrowth(test5, 'cumCount', 'perGro', false);
assert.equal(test7.length, sample.length - 1,
	     "Percent growth not trimming.");
assert.equal(test8.length, sample.length,
	     "Percent growth trimming when told not to.");
assert.equal(dutils.select(test7, 'perGro')[2],
	     91/66*100,
	     "Incorrect percentages.");
	     




