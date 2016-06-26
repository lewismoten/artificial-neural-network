(function createHyperbolicTangent(){

  if(module && module.exports) {

    module.exports = hyperbolicTangent;

  }

  /**
  Hyperbolic Tangent
  @param {number} x The value - ideally between -10 and 10.
  @returns {number} A value between 0 and 1.
  */
  function hyperbolicTangent(x) {
    var y = Math.exp(2 * x);
    return (y - 1) / (y + 1);
  }

}());
