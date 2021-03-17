/**
 * @file javascript.extend.js
 * @fileoverview "This plugin enables to extend native datatypes and gives you the power of IRONMAN!!"
 * @author <Paul Gerorge> [hello@paul-george.me] [https://www.paul-george.me]
 * @license MIT
 * @version 1.0.0
 * Last updated: 14 October 2020
 */

/* eslint  no-extend-native: 0 */
(function () {
  /**
   * Check if a value is null or undefined
   * @since 1.0.0
   * @param {*} i property
   * @example
   * isNullOrUndefined(i);
   * @returns {boolean} true if is null or undefined
   */
  function isNullOrUndefined(i) {
    return Object.is(i, null) || Object.is(i, undefined);
  }
  window.isNullOrUndefined = window.isNullOrUndefined || isNullOrUndefined;

  /**
   * Check if the string is empty. string with only whitespace is also considered as empty
   * @since 1.0.0
   * @returns {boolean} true if empty or contains only whitespaces
   * @example
   * "".isEmpty(); //returns true
   * " ".isEmpty() // returns true
   * "test".isEmpty() // returns false
   */
  String.prototype.isEmpty = function () {
    return !this.trim();
  };

  /**
   * Compares an array and return true if same
   * @since 1.0.0
   * @param {[]} obj Array to compare
   * @param {boolean} caseSensitive set as true if the the case of values should be same
   * @param {boolean} typeSensitive set as true if the type of values should be same
   * @param {boolean} indexSensitive set as true if the position of values should be same
   * @default
   * typeSensitive false
   * caseSensitive false
   * indexSensitive false
   * @returns {boolean} true if both arrays are same
   * @example
   * arr1.isEqual(arr2)
   */
  Array.prototype.isEqual = function (
    obj,
    caseSensitive,
    typeSensitive,
    indexSensitive
  ) {
    if (isNullOrUndefined(obj) || !Array.isArray(obj)) {
      var err = new Error("Argument should be an Array");
      err.name = "InvalidParameter";
      throw err;
    } else {
    }
  };

  JSON.isEqual = function (obj1, obj2, caseSensitive) {
    if (
      typeof obj1 !== "object" ||
      typeof obj2 !== "object" ||
      Array.isArray(obj1) ||
      Array.isArray(obj2)
    ) {
      var err = new Error("Arguments should be in JSON format");
      err.name = "InvalidParameters";
      throw err;
    } else {
      try {
        var props1 = Object.getOwnPropertyNames(obj1);
        var props2 = Object.getOwnPropertyNames(obj1);
        if (props1.length !== props2.length) {
          return false;
        } else {
          var result = true;
          props1.forEach((prop) => {
            if (typeof obj1[prop] !== typeof obj2[prop]) {
              return false;
            } else {
              if (
                typeof obj1[prop] !== "object" ||
                typeof obj2[prop] !== "object" ||
                !Array.isArray(obj1[prop]) ||
                !Array.isArray(obj2[prop])
              ) {
                if (caseSensitive) {
                  if (obj1[prop] !== obj2[prop]) {
                    result = false;
                    return false;
                  }
                } else {
                  if (
                    obj1[prop].toString().toLowerCase() !==
                    obj2[prop].toString().toLowerCase()
                  ) {
                    result = false;
                    return false;
                  }
                }
              } else {
                if (Array.isArray(obj1[prop]) && Array.isArray(obj2[prop])) {
                  if (!obj1[prop].isEqual(obj2[prop])) {
                    result = false;
                    return false;
                  }
                } else {
                  if (!JSON.isEqual(obj1[prop], obj2[prop], caseSensitive)) {
                    result = false;
                    return false;
                  }
                }
              }
            }
          });
          return result;
        }
      } catch (err) {
        throw err;
      }
    }
  };
})();
