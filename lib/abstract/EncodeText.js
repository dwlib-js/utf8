'use strict';

const StringCodePointAt = require('#primordials/StringCodePointAt');
const TypedArraySlice = require('#primordials/TypedArraySlice');
const Uint8Array = require('#primordials/Uint8Array');
const GetMaxByteCount = require('./GetMaxByteCount');
const ThrowInvalidCodePointError = require('./ThrowInvalidCodePointError');

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

module.exports = EncodeText;
