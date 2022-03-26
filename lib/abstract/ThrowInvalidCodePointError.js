'use strict';

const RangeError = require('#primordials/RangeError');

const ThrowInvalidCodePointError = index => {
  throw new RangeError(`Invalid Unicode code point at index ${index}`);
}

module.exports = ThrowInvalidCodePointError;
