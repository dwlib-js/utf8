'use strict';

const RangeError = require('#primordials/RangeError');

const ThrowMissingContinuationBytesError = (index, missingBytes) => {
  const few = missingBytes > 1;
  throw new RangeError(`Missing UTF-8 sequence ${few ? missingBytes : ''} continuation byte${few ? 's' : ''} at index ${index}`);
}

module.exports = ThrowMissingContinuationBytesError;
