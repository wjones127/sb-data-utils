# Data Utilities
## Version 1.0.0
This small javascript library provides a few useful functions for working with
data in javascript. It is supplied as a node module. Data is assumed to be given
in the format of an array of objects, each of which have the same properties.

### Methods
Here are some brief descriptions of the methods. For in-depth documentation of
the methods provided in the module, checkout the JSDoc output at `out/index.html`. 

__`exports.find(array, property, query)`__: Returns the first element in the
`array` whose property `property` matches `query`.

__`exports.select(array, variable)`__: Returns a simple array based giving the
values of the property `variable` in the data set `array`.

__`exports.copy(data)`__: Creates a copy of a data set. This create a new array
with new elements, but the property values of each element are not duplicated.

__`exports.fill(data, input, defaults, start, end)`__: Fills in missing
observations in the data set `data`, based on missing integer values in the
property `input` in the range `[start, end]`. `defaults` gives values for other
properties in the missing observations. This function is useful for filling in
data sets where data for particular years are missing.

__`exports.cumulative(data, input, output, baseline)`__: Adds a new variable to
a data set `data` called `output` which describes the cumulative count of a
variable called `input`, where `baseline` is the value before any growth
occurred.

__`exports.percentGrowth(data, input, output, trim)`__: Adds a new variable to a
data set `data` called `output` which describes the percentage growth based on a
variable called `input`. By default will trim off the first observation.

## Future Version Plans
## 1.0.1

- Implement new `fill` method that will also work well with filling in dates.
- Create a deep-copy option in the `copy` method.
- Figure out better handling of trimming growth data.