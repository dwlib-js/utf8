'use strict';

const RangeError = require('#primordials/RangeError');

const ThrowInvalidContinuationByteError = index => {
  throw new RangeError(`Invalid UTF-8 sequence continuation byte at index ${index}`);
}

module.exports = ThrowInvalidContinuationByteError;
