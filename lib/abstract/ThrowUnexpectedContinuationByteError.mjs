import RangeError from '#primordials/RangeError';

const ThrowUnexpectedContinuationByteError = index => {
  throw new RangeError(`Unexpected UTF-8 sequence continuation byte at index ${index}`);
}

export default ThrowUnexpectedContinuationByteError;
