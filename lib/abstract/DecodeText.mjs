import StringFromCodePoint from '#primordials/StringFromCodePoint';
import TypedArrayLength from '#primordials/TypedArrayLength';
import IncludesBOM from './IncludesBOM.mjs';

const DecodeText = (buffer, ignoreBOM) => {
  const length = TypedArrayLength(buffer);
  const startIndex = !ignoreBOM && length >= 3 && IncludesBOM(buffer) ? 3 : 0;
  let string = '';
  for (let i = startIndex; i < length; i++) {
    const byte = buffer[i];
    if (byte <= 0x7f) {
      string += StringFromCodePoint(byte);
    } else if (byte <= 0xdf) {
      if (i + 1 >= length) {
        string += '\ufffd';
        break;
      }
      const byte2 = buffer[++i];
      const codePoint = ((byte & 0x1f) << 6) | (byte2 & 0x3f);
      string += StringFromCodePoint(codePoint);
    } else if (byte <= 0xef) {
      if (i + 2 >= length) {
        string += '\ufffd';
        break;
      }
      const byte2 = buffer[++i];
      const byte3 = buffer[++i];
      const codePoint = ((byte & 0xf) << 12) | ((byte2 & 0x3f) << 6) | (byte3 & 0x3f);
      string += StringFromCodePoint(codePoint);
    } else if (byte <= 0xf4) {
      if (i + 3 >= length) {
        string += '\ufffd';
        break;
      }
      const byte2 = buffer[++i];
      const byte3 = buffer[++i];
      const byte4 = buffer[++i];
      const codePoint = ((byte & 7) << 18) | ((byte2 & 0x3f) << 12) | ((byte3 & 0x3f) << 6) | (byte4 & 0x3f);
      string += StringFromCodePoint(codePoint);
    } else {
      string += '\ufffd';
    }
  }
  return string;
}

export default DecodeText;
