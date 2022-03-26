import RangeError from '#primordials/RangeError';

const ThrowInvalidSequenceError = index => {
  throw new RangeError(`Invalid Unicode sequence at index ${index}`);
}

export default ThrowInvalidSequenceError;
