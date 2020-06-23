/*
	MIT License http://www.opensource.org/licenses/mit-license.php
*/

'use strict';

/** @template T @typedef {function(): T} FunctionReturning */

/**
 * 返回一个记忆化结果的函数
 * 可以用在固定输出的函数，通过一个memorized变量来标记是否被记忆
 * @template T
 * @param {FunctionReturning<T>} fn memorized function
 * @returns {FunctionReturning<T>} new function
 */
const memorize = (fn) => {
  let memorized = false;
  /** @type {T} */
  let result = undefined;
  return () => {
    if (memorized) {
      return result;
    } else {
      result = fn();
      memorized = true;
      // Allow to clean up memory for fn
      // and all dependent resources
      fn = undefined;
      return result;
    }
  };
};

module.exports = memorize;
