'use strict';

const BufferSourceAsUint8Array = require('#abstract/BufferSourceAsUint8Array');
const DecodeString = require('#abstract-functions/DecodeString');
const ToErrorMode = require('#abstract-functions/ToErrorMode');

const decode = (source, errorMode, ignoreBOM) => {
  const buffer = BufferSourceAsUint8Array(source);
  const mode = errorMode === undefined ? 'replace' : ToErrorMode(errorMode);
  return DecodeString(buffer, mode, ignoreBOM);
}

module.exports = decode;
