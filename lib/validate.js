'use strict';

const BufferSourceAsUint8Array = require('#abstract/BufferSourceAsUint8Array');
const ValidateBytes = require('#abstract-functions/ValidateBytes');

const validate = source => {
  const buffer = BufferSourceAsUint8Array(source);
  return ValidateBytes(buffer);
}

module.exports = validate;
