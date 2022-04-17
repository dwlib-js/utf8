'use strict';

const GetIntrinsicOrThrow = require('#intrinsics/GetIntrinsicOrThrow');
const ObjectCreate = require('#primordials/ObjectCreate');
const ReflectDefineProperty = require('#primordials/ReflectDefineProperty');
const UTF8Decode = require('./decode');
const UTF8Encode = require('./encode');
const UTF8EncodeInto = require('./encodeInto');
const UTF8IsValid = require('./isValid');
const UTF8Validate = require('./validate');

const ObjectPrototype = GetIntrinsicOrThrow('Object.prototype');
const SymbolToStringTag = GetIntrinsicOrThrow('@@toStringTag');

const UTF8 = ObjectCreate(ObjectPrototype, {
  decode: {
    value: UTF8Decode
  },
  encode: {
    value: UTF8Encode
  },
  encodeInto: {
    value: UTF8EncodeInto
  },
  isValid: {
    value: UTF8IsValid
  },
  validate: {
    value: UTF8Validate
  }
});
ReflectDefineProperty(UTF8, SymbolToStringTag, {
  value: 'UTF8'
});

module.exports = UTF8;
