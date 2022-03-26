'use strict';

const BufferSourceAsUint8Array = require('#abstract/BufferSourceAsUint8Array');
const DecodeText = require('#abstract-functions/DecodeText');
const DecodeTextOrThrow = require('#abstract-functions/DecodeTextOrThrow');

const decode = (source, fatal, ignoreBOM) => {
  const buffer = BufferSourceAsUint8Array(source);
  return fatal ? DecodeTextOrThrow(buffer, ignoreBOM) : DecodeText(buffer, ignoreBOM);
}

module.exports = decode;
