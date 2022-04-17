import StringFromCodePoint from '#primordials/StringFromCodePoint';
import TypedArrayLength from '#primordials/TypedArrayLength';
import IncludesBOM from './IncludesBOM.mjs';

const DecodeStringReplace = (buffer, ignoreBOM) => {
  const length = TypedArrayLength(buffer);
  const startIndex = !ignoreBOM && length >= 3 && IncludesBOM(buffer) ? 3 : 0;
  let string = '';
  let codePoint = 0;
  let continuationBytes = 0;
  let continuationByte = 0;
  let lowerBoundary = 0x80;
  let upperBoundary = 0xbf;
  for (let i = startIndex; i < length; i++) {
    const byte = buffer[i];
    if (continuationBytes) {
      if (byte >= lowerBoundary && byte <= upperBoundary) {
        codePoint = (codePoint << 6) | (byte & 0x3f);
        if (++continuationByte < continuationBytes) {
          continue;
        }
        string += StringFromCodePoint(codePoint);
      } else {
        string += '\ufffd';
      }
      codePoint = 0;
      continuationBytes = 0;
      continuationByte = 0;
      lowerBoundary = 0x80;
      upperBoundary = 0xbf;
    } else if (byte <= 0x7f) {
      string += StringFromCodePoint(byte);
    } else if (byte >= 0xc2 && byte <= 0xdf) {
      continuationBytes = 1;
      codePoint = byte & 0x1f;
    } else if (byte >= 0xe0 && byte <= 0xef) {
      continuationBytes = 2;
      codePoint = byte & 0xf;
      if (byte === 0xe0) {
        lowerBoundary = 0xa0;
      } else if (byte === 0xed) {
        upperBoundary = 0x9f;
      }
    } else if (byte >= 0xf0 && byte <= 0xf4) {
      continuationBytes = 3;
      codePoint = byte & 7;
      if (byte === 0xf0) {
        lowerBoundary = 0x90;
      } else if (byte === 0xf4) {
        upperBoundary = 0x8f;
      }
    } else {
      string += '\ufffd';
    }
  }
  return continuationByte !== continuationBytes ? `${string}\ufffd` : string;
}

export default DecodeStringReplace;
