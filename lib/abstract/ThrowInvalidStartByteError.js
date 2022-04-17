'use strict';

const RangeError = require('#primordials/RangeError');

const ThrowInvalidStartByteError = index => {
  throw new RangeError(`Invalid UTF-8 sequence start byte at index ${index}`);
}

module.exports = ThrowInvalidStartByteError;
