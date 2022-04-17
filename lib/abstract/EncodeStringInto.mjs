import StringCodePointAt from '#primordials/StringCodePointAt';
import TypedArrayLength from '#primordials/TypedArrayLength';
import ThrowInvalidCodePointError from './ThrowInvalidCodePointError.mjs';

const EncodeStringInto = (string, destination) => {
  const length = string.length;
  const destinationLength = TypedArrayLength(destination);
  let index = 0;
  let destinationIndex = 0;
  while (index < length && destinationIndex < destinationLength) {
    const codePoint = StringCodePointAt(string, index);
    if (codePoint <= 0x7f) {
      destination[destinationIndex++] = codePoint;
      index++;
      continue;
    }
    let bits;
    let mask;
    if (codePoint <= 0x7ff) {
      bits = 6;
      mask = 0xc0;
    } else if (codePoint <= 0xffff) {
      bits = 12;
      mask = 0xe0;
    } else if (codePoint <= 0x10ffff) {
      bits = 18;
      mask = 0xf0;
      index++;
    } else {
      ThrowInvalidCodePointError(index);
    }
    destination[destinationIndex++] = (codePoint >> bits) | mask;
    while (bits) {
      bits -= 6;
      destination[destinationIndex++] = ((codePoint >> bits) & 0x3f) | 0x80;
    }
    index++;
  }
  return {
    read: index,
    written: destinationIndex
  };
}

export default EncodeStringInto;
