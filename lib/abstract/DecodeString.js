'use strict';

const DecodeStringBreak = require('./DecodeStringBreak');
const DecodeStringIgnore = require('./DecodeStringIgnore');
const DecodeStringReplace = require('./DecodeStringReplace');
const DecodeStringStrict = require('./DecodeStringStrict');

const DecodeString = (buffer, errorMode, ignoreBOM) => {
  const decode = (
    errorMode === 'strict' ? DecodeStringStrict :
    errorMode === 'break' ? DecodeStringBreak :
    errorMode === 'ignore' ? DecodeStringIgnore : DecodeStringReplace
  );
  return decode(buffer, ignoreBOM);
}

module.exports = DecodeString;
