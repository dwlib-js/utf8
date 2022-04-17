'use strict';

const TypeError = require('#primordials/TypeError');
const IsUint8Array = require('#types/isUint8Array');
const ToString = require('#abstract/ToString');
const EncodeStringInto = require('#abstract-functions/EncodeStringInto');

const encodeInto = (string, destination) => {
  const chars = ToString(string);
  if (!IsUint8Array(destination)) {
    throw new TypeError('destination is not an instance of Uint8Array');
  }
  return EncodeStringInto(chars, destination);
}

module.exports = encodeInto;
