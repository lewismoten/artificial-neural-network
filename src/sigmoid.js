(function createSigmoid(){

  if(module && module.exports) {

    module.exports = sigmoid;

  }

  /**
  Sigmoid Function
  @param {number} t A value capped between -10 and 10. (11 will give the same result as 10)
  @param {boolean} [useDerivative] Use the derivative
  @returns {number} A value between 0 and 1.
  */
  function sigmoid(t, useDerivative) {

    var n;

    if(useDerivative) {

      return (n = sigmoid(t)) * (1 - n);

    }

    return 1 / (1 + Math.pow(Math.E, -t));

  }

}());
