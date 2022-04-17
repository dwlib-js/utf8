import RangeError from '#primordials/RangeError';

const ThrowInvalidStartByteError = index => {
  throw new RangeError(`Invalid UTF-8 sequence start byte at index ${index}`);
}

export default ThrowInvalidStartByteError;
