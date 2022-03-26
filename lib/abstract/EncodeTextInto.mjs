import StringCodePointAt from '#primordials/StringCodePointAt';
import TypedArrayLength from '#primordials/TypedArrayLength';
import ThrowInvalidCodePointError from './ThrowInvalidCodePointError.mjs';

const EncodeTextInto = (text, destination) => {
  const length = text.length;
  const destinationLength = TypedArrayLength(destination);
  let index = 0;
  let destinationIndex = 0;
  while (index < length && destinationIndex < destinationLength) {
    const codePoint = StringCodePointAt(text, index);
    if (codePoint <= 0x7f) {
      destination[destinationIndex++] = codePoint;
    } else if (codePoint <= 0x7ff) {
      if (destinationIndex + 2 >= destinationLength) {
        break;
      }
      destination[destinationIndex++] = (codePoint >> 6) | 0xc0;
      destination[destinationIndex++] = (codePoint & 0x3f) | 0x80;
    } else if (codePoint <= 0xffff) {
      if (destinationIndex + 3 >= destinationLength) {
        break;
      }
      destination[destinationIndex++] = (codePoint >> 12) | 0xe0;
      destination[destinationIndex++] = ((codePoint >> 6) & 0x3f) | 0x80;
      destination[destinationIndex++] = (codePoint & 0x3f) | 0x80;
    } else if (codePoint <= 0x10ffff) {
      if (destinationIndex + 4 >= destinationLength) {
        break;
      }
      destination[destinationIndex++] = (codePoint >> 18) | 0xf0;
      destination[destinationIndex++] = ((codePoint >> 12) & 0x3f) | 0x80;
      destination[destinationIndex++] = ((codePoint >> 6) & 0x3f) | 0x80;
      destination[destinationIndex++] = (codePoint & 0x3f) | 0x80;
      index++;
    } else {
      ThrowInvalidCodePointError(index);
    }
    index++;
  }
  return {
    read: index,
    written: destinationIndex
  };
}

export default EncodeTextInto;
