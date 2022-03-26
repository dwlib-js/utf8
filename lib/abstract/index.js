'use strict';

const DecodeText = require('./DecodeText');
const DecodeTextOrThrow = require('./DecodeTextOrThrow');
const EncodeText = require('./EncodeText');
const EncodeTextInto = require('./EncodeTextInto');
const GetMaxByteCount = require('./GetMaxByteCount');
const IncludesBOM = require('./IncludesBOM');
const ThrowInvalidCodePointError = require('./ThrowInvalidCodePointError');
const ThrowInvalidSequenceError = require('./ThrowInvalidSequenceError');

module.exports = {
  DecodeText,
  DecodeTextOrThrow,
  EncodeText,
  EncodeTextInto,
  GetMaxByteCount,
  IncludesBOM,
  ThrowInvalidCodePointError,
  ThrowInvalidSequenceError
};
