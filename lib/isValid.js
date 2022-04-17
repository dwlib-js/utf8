'use strict';

const BufferSourceAsUint8Array = require('#abstract/BufferSourceAsUint8Array');
const IsValidBytes = require('#abstract-functions/IsValidBytes');

const isValid = source => {
  const buffer = BufferSourceAsUint8Array(source);
  return IsValidBytes(buffer);
}

module.exports = isValid;
