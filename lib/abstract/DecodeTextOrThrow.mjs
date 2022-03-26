import StringFromCodePoint from '#primordials/StringFromCodePoint';
import TypedArrayLength from '#primordials/TypedArrayLength';
import IncludesBOM from './IncludesBOM.mjs';
import ThrowInvalidSequenceError from './ThrowInvalidSequenceError.mjs';

const DecodeTextOrThrow = (buffer, ignoreBOM) => {
  const length = TypedArrayLength(buffer);
  let string = '';
  const startIndex = !ignoreBOM && length >= 3 && IncludesBOM(buffer) ? 3 : 0;
  for (let i = startIndex; i < length; i++) {
    const byte = buffer[i];
    if (byte <= 0x7f) {
      string += StringFromCodePoint(byte);
    } else if (byte <= 0xdf) {
      if (i + 1 >= length) {
        ThrowInvalidSequenceError(i);
      }
      const byte2 = buffer[++i];
      const codePoint = ((byte & 0x1f) << 6) | (byte2 & 0x3f);
      string += StringFromCodePoint(codePoint);
    } else if (byte <= 0xef) {
      if (i + 2 >= length) {
        ThrowInvalidSequenceError(i);
      }
      const byte2 = buffer[++i];
      const byte3 = buffer[++i];
      const codePoint = ((byte & 0xf) << 12) | ((byte2 & 0x3f) << 6) | (byte3 & 0x3f);
      string += StringFromCodePoint(codePoint);
    } else if (byte <= 0xf4) {
      if (i + 3 >= length) {
        ThrowInvalidSequenceError(i);
      }
      const byte2 = buffer[++i];
      const byte3 = buffer[++i];
      const byte4 = buffer[++i];
      const codePoint = ((byte & 7) << 18) | ((byte2 & 0x3f) << 12) | ((byte3 & 0x3f) << 6) | (byte4 & 0x3f);
      string += StringFromCodePoint(codePoint);
    } else {
      ThrowInvalidSequenceError(i);
    }
  }
  return string;
}

export default DecodeTextOrThrow;
