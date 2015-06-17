/**
 * Data Utilities Module
 */


/**
 * Gives the minimum of an array.
 * @param {array} arr - the array to find the min of.
 */
function arrayMin(arr) {
  return arr.reduce(function(previous, current) {
    return previous < current ? previous : current;
  });
}

/**
 * Gives the maximum of an array
 * @param {array} arr - the array to find the max of.
 */
function arrayMax(arr) {
  return arr.reduce(function(previous, current) {
    return previous > current ? previous : current;
  });
}

/**
 * Finds and returns the first element in the array where the given property
 * is equal to the query.
 * @param {array} array - the array to search in.
 * @param {string} property - the name of the property to look at.
 * @param {*} query - value to match (matches with ===).
 */
exports.find = function(array, property, query) {
  for (var i = 0; i < array.length; i++)
    if (array[i][property] === query)
      return array[i];
  return -1;
}

/**
 * Returns an array of values of the given property from the dataset.
 * @param {array} data - the array of objects from which to get data.
 * @param {string} variable - the property name to pick out of the data.
 */
exports.select = function(data, variable) {
  var output = [];
  for (var i = 0; i < data.length; i++)
    output.push(data[i][variable]);
  return output;
}

/**
 * Creates a copy of a dataset. Only goes one level deep; copies the properties
 * of elements in the data array.
 * @param {array} data - an array of objects to copy.
 */
exports.copy = function(data) {
  var keys = Object.keys(data[0]);
  var output = [];
  for (var i = 0; i < data.length; i++) {
    var item = {}
    for (var j = 0; j < keys.length; j++)
      item[keys[j]] = data[i][keys[j]];
    output.push(item);
  }
  return output;
}

/**
 * Fills in missing values in a data set, based on a variable with integer
 * values. defaults gives the values to fill in missing values for other
 * variables.
 * @param {array} data - the data set to fill in.
 * @param {string} input - the name of the property to be filled in. Needs to be
 * integer values.
 * @param {object} defaults - an object with the default values for the other
 * variables.
 * @param {number} start - (optional) a number giving where the range should
 * start. If this number is larger than the max value of existing values, it will
 * be used instead as the upper bound.
 * @param {number} end - (optional) a number giving where the range should end.
 */
exports.fill = function(data, input, defaults, start, end) {  
  data = this.copy(data); // make a copy

  // First, figure out what the appropriate range of values should be
  var inputs = this.select(data, input);
  var min = arrayMin(inputs);
  var max = arrayMax(inputs);
  
  if (start === undefined && end === undefined)
    start = min, end = max;
  else if (end === undefined && start < min)
    end = max;
  else if (end === undefined && start > max)
    end = start, start = min;

  // Create new array of filled in values
  inputs = [];
  for (var i = start; i <= end; i++)
    inputs.push(i);
  
  // Create output array
  var output = [];
  for (var i = 0; i < inputs.length; i++) {
    var x = this.find(data, input, inputs[i]);
    if (x !== -1)
      output[i] = x;
    else {
      output[i] = this.copy([defaults])[0];
      output[i][input] = inputs[i];
    }
  }
  
  return output;
}
/**
 * Creates a new variable in dataset that gives the cumulative value based on
 * another variable giving growth counts.
 * @param {array} data - an array of objects to be the data to work with.
 * @param {string} input - the name of the property to use as the growth counts
 * @param {string} output - the name of the property to save the cumulative
 * counts in.
 * @param {numeric} baseline - (optional) the intial value of the cumulative
 * value before any growth.
 */
exports.cumulative = function(data, input, output, baseline) {
  data = this.copy(data); // make a copy
  baseline = baseline || 0;
  
  data[0][output] = data[0][input] + baseline;
  for (var i = 1; i < data.length; i++)
    data[i][output] = data[i][input] + data[i-1][output];
  return data;
}

/**
 * Saves the percent growth in a new variable in a dataset, calcualted based on
 * a cumulative count variable.
 * @param {array} data - an array of objects to be used as the data set.
 * @param {string} input - the name of the property giving the changing count.
 * @param {string} output - the name of the property to save the percentages in.
 * @param {boolean} trim - where to trim off the first observation (otherwise it
 * will just be saved as zero.)
 */
exports.percentGrowth = function(data, input, output, trim) {
  if (trim === undefined) trim = true;

  data = this.copy(data);

  var result = data.map(function(item, i, array) {
    var out = item;
    if (i > 0)
      out[output] = out[input] / array[i-1][input] * 100;
    return out;
  });
  
  if (trim)
    result.shift();
  else
    result[0][output] = 0;
  
  return result;
}
