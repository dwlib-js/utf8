'use strict';

const TypeError = require('#primordials/TypeError');
const IsUint8Array = require('#types/isUint8Array');
const ToString = require('#abstract/ToString');
const EncodeTextInto = require('#abstract-functions/EncodeTextInto');

const encodeInto = (text, destination) => {
  const string = ToString(text);
  if (!IsUint8Array(destination)) {
    throw new TypeError('destination is not an instance of Uint8Array');
  }
  return EncodeTextInto(string, destination);
}

module.exports = encodeInto;
