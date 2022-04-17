'use strict';

const RangeError = require('#primordials/RangeError');

const ThrowUnexpectedContinuationByteError = index => {
  throw new RangeError(`Unexpected UTF-8 sequence continuation byte at index ${index}`);
}

module.exports = ThrowUnexpectedContinuationByteError;
