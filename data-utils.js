function arrayMin(arr) {
  // Gives the minimum of an array
  return arr.reduce(function(previous, current) {
    return previous < current ? previous : current;
  });
}
function arrayMax(arr) {
  // Gives the maximum of an array
  return arr.reduce(function(previous, current) {
    return previous > current ? previous : current;
  });
}
exports.find = function(array, property, query) {
  // Finds the element in the array whose property location is equal to
  // the target.
  for (var i = 0; i < array.length; i++)
    if (array[i][property] === query)
      return array[i];
  return -1;
}


exports.select = function(data, variable) {
  var output = [];
  for (var i = 0; i < data.length; i++)
    output.push(data[i][variable]);
  return output;
}

exports.copy = function(data) {
  // assumes objects are flat, but whatever
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

exports.cumulative = function(data, input, output, baseline) {
  data = this.copy(data); // make a copy
  baseline = baseline || 0;
  
  data[0][output] = data[0][input] + baseline;
  for (var i = 1; i < data.length; i++)
    data[i][output] = data[i][input] + data[i-1][output];
  return data;
}

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
