'use strict';

const ToString = require('#abstract/ToString');
const EncodeText = require('#abstract-functions/EncodeText');

const encode = text => {
  const string = ToString(text);
  return EncodeText(string);
}

module.exports = encode;
