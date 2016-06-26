(function createHeavsideStep(){

  if(module && module.exports) {

    module.exports = heavsideStep;

  }

  /**
  Heavside Step
  @param {number} x The value to be evaluated
  @returns {number} 0 if signed; 1 if unsigned, otherwise 0.5
  */
  function heavsideStep(x) {

    return x < 0 ? 0 : (x > 0 ? 1 : 0.5);

  }

}());
