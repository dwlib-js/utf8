import StringCodePointAt from '#primordials/StringCodePointAt';
import TypedArraySlice from '#primordials/TypedArraySlice';
import Uint8Array from '#primordials/Uint8Array';
import GetMaxByteCount from './GetMaxByteCount.mjs';
import ThrowInvalidCodePointError from './ThrowInvalidCodePointError.mjs';

const EncodeText = text => {
  const length = text.length;
  const maxByteCount = GetMaxByteCount(length);
  const bytes = new Uint8Array(maxByteCount);
  let index = 0;
  for (let i = 0; i < length; i++) {
    const codePoint = StringCodePointAt(text, i);
    if (codePoint <= 0x7f) {
      bytes[index++] = codePoint;
    } else if (codePoint <= 0x7ff) {
      bytes[index++] = (codePoint >> 6) | 0xc0;
      bytes[index++] = (codePoint & 0x3f) | 0x80;
    } else if (codePoint <= 0xffff) {
      bytes[index++] = (codePoint >> 12) | 0xe0;
      bytes[index++] = ((codePoint >> 6) & 0x3f) | 0x80;
      bytes[index++] = (codePoint & 0x3f) | 0x80;
    } else if (codePoint <= 0x10ffff) {
      bytes[index++] = (codePoint >> 18) | 0xf0;
      bytes[index++] = ((codePoint >> 12) & 0x3f) | 0x80;
      bytes[index++] = ((codePoint >> 6) & 0x3f) | 0x80;
      bytes[index++] = (codePoint & 0x3f) | 0x80;
      i++;
    } else {
      ThrowInvalidCodePointError(i);
    }
  }
  return index !== maxByteCount ? TypedArraySlice(bytes, 0, index) : bytes;
}

export default EncodeText;
