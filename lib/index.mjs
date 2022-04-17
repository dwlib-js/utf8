import GetIntrinsicOrThrow from '#intrinsics/GetIntrinsicOrThrow';
import ObjectCreate from '#primordials/ObjectCreate';
import ReflectDefineProperty from '#primordials/ReflectDefineProperty';
import UTF8Decode from './decode.mjs';
import UTF8Encode from './encode.mjs';
import UTF8EncodeInto from './encodeInto.mjs';
import UTF8IsValid from './isValid.mjs';
import UTF8Validate from './validate.mjs';

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

export default UTF8;
