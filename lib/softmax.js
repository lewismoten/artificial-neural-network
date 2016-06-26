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

}.call(this, 'softmax', [], function instantiate() {

  'use strict';

  return softmax;

  /**
  Softmax
  @param {number[]} values A list of numbers ranging from -10 to 10
  @returns {number[]} The normalized list of entries between 0 and 1
  where the sum is 1.
  */
  function softmax(values) {

    values.map(checkValue);

    if (values.length === 1) {

      return [1];

    }

    const exponents = values.map(Math.exp),
      total = exponents.reduce(sum, 0);

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


  // eslint-disable-next-line valid-jsdoc
  /**
  Divide
  @this {number} The divisor
  @param {number} dividend The number to be divided
  @returns {number} The quotient
  */
  function divide(dividend) {

    return dividend / this;

  }

  /**
  Checks the value to determine if it is valid
  @param {*} value The value
  @throws {invalidArgumentMessage} The value must be a number in-range
  @returns {undefined}
  */
  function checkValue(value) {

    if (typeof value !== 'number') {

      throw invalidArgumentMessage(value);

    }

    switch (value) {

      case Infinity:
      case -Infinity:
      case Number.MAX_VALUE:
      case -Number.MAX_VALUE:
        throw invalidArgumentMessage(value);

      default:

    }

  }

  /**
  An invalid argument message
  @param {*} value The value of the argument
  @returns {string} The message indicating that the value is invalid.
  */
  function invalidArgumentMessage(value) {

    return `Invalid argument specified: ${JSON.stringify(value)}`;

  }

}));
