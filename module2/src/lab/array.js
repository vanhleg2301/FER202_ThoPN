var array = [1, 2, 3, 4];
// Applies a function passed as the first parameter against an accumulator and each element in the array (from left to right), thus reducing it to a single value. The initial value of the accumulator should be provided as the second parameter of the reduce function.

var sum = array.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);

console.log(sum); // Output: 10

// Implementation of very simple functions (like the aforementioned sum or product) requires writing a lot of boilerplate. Is there any remedy for that? just try arrow functions!
var product = array.reduce(
  (accumulator, currentValue) => accumulator * currentValue,
  1
);

console.log(product); // Output: 24
