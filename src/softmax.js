(function createSoftmax(){

  if(module && module.exports) {

    module.exports = softmax;

  }

  /**
  Softmax
  @param {number[]} values A list of numbers ranging from -10 to 10
  @returns {number[]} The normalized list of entries between 0 and 1 where the sum is 1.
  */
  function softmax(values) {

    var exponents = values.map(Math.exp);
    var total = exponents.reduce(sum, 0);
    return exponents.map(divide, total);

  }

  /**
  Sum
  @param {number} augend The number to whcih an addend is added.
  @param {number} addend A number that is added to another.
  @returns {number} The sum
  */
  function sum(augend, addend) {

    return augend + addend;

  }

  /*
  Divide
  @this {number} The divisor
  @param {number} dividend The number to be divided
  @returns {number} The quotient
  */
  function divide(dividend) {

    return dividend / this;

  }

}());
