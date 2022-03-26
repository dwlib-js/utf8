'use strict';

const RangeError = require('#primordials/RangeError');

const ThrowInvalidSequenceError = index => {
  throw new RangeError(`Invalid Unicode sequence at index ${index}`);
}

module.exports = ThrowInvalidSequenceError;
