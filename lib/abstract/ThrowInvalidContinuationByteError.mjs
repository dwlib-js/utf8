import RangeError from '#primordials/RangeError';

const ThrowInvalidContinuationByteError = index => {
  throw new RangeError(`Invalid UTF-8 sequence continuation byte at index ${index}`);
}

export default ThrowInvalidContinuationByteError;
