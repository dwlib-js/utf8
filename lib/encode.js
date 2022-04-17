'use strict';

const ToString = require('#abstract/ToString');
const EncodeString = require('#abstract-functions/EncodeString');

const encode = string => {
  const chars = ToString(string);
  return EncodeString(chars);
}

module.exports = encode;
