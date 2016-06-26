(
  /**
   * Register a module for CommonJS, AMD, and the global namespace.
   *
   * @param  {string} id                The identity of the module
   * @param  {string[]} dependencyNames List of dependency names
   * @param  {function} instantiate       Factory method to get the module
   * @return {undefined}
   */
  function registerModule(id, dependencyNames, instantiate) {

  'use strict';

  let that = this;

  if (isCommonJs()) {

    let dependencies = dependencyNames.map(require);
    exports = module.exports = that[id] = instantiate.apply(null, dependencies);

  } else if (isAmd()) {

    define(id, dependencyNames, function factory() {

      let result = that[id] = instantiate.call(null, arguments);
      return result;

    });

  } else {

    let dependencies = dependencyNames.map(getThis, that);
    that[id] = instantiate.apply(null, dependencies);

  }


  /**
   * Get the value of an objects key
   *
   ** @this {object}       The source
   * @param  {string} key The key
   * @return {*}          The objects key value
   */
  function getThis(key) {

    return this[key];

  }

  /**
   * Determines if the environment appears to be CommonJS
   *
   * @return {boolean}  True if environment is CommonJS, otherwise false
   */
  function isCommonJs() {

    return typeof module !== 'undefined' &&
      typeof module.exports !== 'undefined';

  }

  /**
   * Determines if the environment supports Asynchronous module definition (AMD)
   *
   * @return {boolean}  True if environment supports AMD, otherwise false
   */
  function isAmd() {

    return typeof define === 'function' && define.amd;

  }

}.call(this, 'hyperbolicTangent', [], function instantiate() {

  'use strict';

  return hyperbolicTangent;

  /**
  Hyperbolic Tangent
  @param {number} x The value - ideally between -10 and 10.
  @returns {number} A value between 0 and 1.
  */
  function hyperbolicTangent(x) {

    let y = Math.exp(2 * x);
    return (y - 1) / (y + 1);

  }

}));
