import StringCodePointAt from '#primordials/StringCodePointAt';
import TypedArraySlice from '#primordials/TypedArraySlice';
import Uint8Array from '#primordials/Uint8Array';
import GetMaxByteCount from './GetMaxByteCount.mjs';
import ThrowInvalidCodePointError from './ThrowInvalidCodePointError.mjs';

const EncodeString = string => {
  const length = string.length;
  const maxByteCount = GetMaxByteCount(length);
  const bytes = new Uint8Array(maxByteCount);
  let index = 0;
  for (let i = 0; i < length; i++) {
    const codePoint = StringCodePointAt(string, i);
    if (codePoint <= 0x7f) {
      bytes[index++] = codePoint;
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
      i++;
    } else {
      ThrowInvalidCodePointError(i);
    }
    bytes[index++] = (codePoint >> bits) | mask;
    while (bits) {
      bits -= 6;
      bytes[index++] = ((codePoint >> bits) & 0x3f) | 0x80;
    }
  }
  return index !== maxByteCount ? TypedArraySlice(bytes, 0, index) : bytes;
}

export default EncodeString;
