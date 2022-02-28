import {
  ArrayForEach,
  FunctionBind,
  Map,
  MapPrototypeGet,
  MapSet,
  ObjectCreate,
  ObjectPrototype,
  RangeError,
  StringFromCodePoint,
  StringCodePointAt,
  SymbolToStringTag,
  TypeError,
  TypedArrayLength,
  TypedArraySlice,
  Uint8ArrayOf,
  Uint8Array,
  globalThis,
  uncurryThis
} from '@dwlib/primordials';
import ToString from '@dwlib/abstract/ToString';
import IsUint8Array from '@dwlib/abstract/IsUint8Array';
import IsBuffer from '@dwlib/abstract/IsBuffer';
import IsObject from '@dwlib/abstract/IsObject';

const TextEncoder = globalThis.TextEncoder;
const TextEncoderPrototype = TextEncoder ? TextEncoder.prototype : undefined;
const TextEncoderPrototypeEncode = TextEncoderPrototype ? TextEncoderPrototype.encode : undefined;
const TextEncoderPrototypeEncodeInto = TextEncoderPrototype ? TextEncoderPrototype.encodeInto : undefined;

const TextDecoder = globalThis.TextDecoder;
const TextDecoderPrototype = TextDecoder ? TextDecoder.prototype : undefined;
const TextDecoderPrototypeDecode = TextDecoderPrototype ? TextDecoderPrototype.decode : undefined;

let BITS;
let SHIFTS;
let GetCodePointBytes;

if (!TextEncoderPrototypeEncodeInto) {
  BITS = Uint8ArrayOf(0, 0xc0, 0xe0, 0xf0);
  SHIFTS = Uint8ArrayOf(0, 6, 12, 18);

  GetCodePointBytes = codePoint => (
    codePoint <= 0x7f ? 1 :
    codePoint <= 0x7ff ? 2 :
    codePoint <= 0xffff ? 3 :
    codePoint <= 0x10ffff ? 4 : undefined
  );
}

let Encode;
let EncodeInto;
let Decode;

if (TextEncoder) {
  const ENCODER = new TextEncoder();

  Encode = FunctionBind(TextEncoderPrototypeEncode, ENCODER);

  if (TextEncoderPrototypeEncodeInto) {
    EncodeInto = FunctionBind(TextEncoderPrototypeEncodeInto, ENCODER);
  }
} else {
  const GetCapacity = length => length * 2 + 5;

  Encode = string => {
    const length = string.length;
    const capacity = GetCapacity(length);
    const result = new Uint8Array(capacity);
    let index = 0;
    for (let i = 0; i < length; i++) {
      const codePoint = StringCodePointAt(string, i);
      const bytes = GetCodePointBytes(codePoint);
      if (bytes > 1) {
        let byte = bytes - 1;
        result[index++] = (codePoint >> SHIFTS[byte]) | BITS[byte];
        while (--byte >= 0) {
          result[index++] = ((codePoint >> SHIFTS[byte]) & 0x3f) | 0x80;
        }
        if (bytes > 3) {
          i++;
        }
      } else {
        result[index++] = codePoint;
      }
    }
    return capacity !== index ? TypedArraySlice(result, 0, index) : result;
  }
}

if (!EncodeInto) {
  EncodeInto = (string, destination) => {
    const length = string.length;
    const capacity = TypedArrayLength(destination);
    let charIndex = 0;
    let index = 0;
    while (charIndex < length) {
      const codePoint = StringCodePointAt(string, charIndex);
      const bytes = GetCodePointBytes(codePoint);
      if (index + bytes > capacity) {
        break;
      }
      if (bytes > 1) {
        let byte = bytes - 1;
        destination[index++] = (codePoint >> SHIFTS[byte]) | BITS[byte];
        while (--byte >= 0) {
          destination[index++] = ((codePoint >> SHIFTS[byte]) & 0x3f) | 0x80;
        }
        if (bytes > 3) {
          charIndex++;
        }
      } else {
        destination[index++] = codePoint;
      }
      charIndex++
    }
    return {
      read: charIndex,
      written: index
    };
  }
}

if (TextDecoder) {
  const TextDecoderDecode = uncurryThis(TextDecoderPrototypeDecode);

  const DECODERS = new Map();

  const GetDecoder = FunctionBind(MapPrototypeGet, DECODERS);

  ArrayForEach([
    ['default', new TextDecoder()],
    ['fatal', new TextDecoder(undefined, {
      fatal: true
    })],
    ['ignoreBOM', new TextDecoder(undefined, {
      ignoreBOM: true
    })],
    ['fatal+ignoreBOM', new TextDecoder(undefined, {
      fatal: true,
      ignoreBOM: true
    })]
  ], ([key, decoder]) => {
    MapSet(DECODERS, key, decoder);
  });

  Decode = (buffer, fatal, ignoreBOM) => {
    const decoder = GetDecoder(
      fatal && ignoreBOM ? 'fatal+ignoreBOM' :
      fatal ? 'fatal' :
      ignoreBOM ? 'ignoreBOM' : 'default'
    );
    try {
      return TextDecoderDecode(decoder, buffer);
    } catch (e) {
      throw new RangeError('Invalid UTF-8 encoding');
    }
  }
} else {
  const MASKS = Uint8ArrayOf(0xff, 0x1f, 0x0f, 7);

  const GetOctetBytes = octet => (
    octet <= 0x7f ? 1 :
    octet <= 0xdf ? 2 :
    octet <= 0xef ? 3 :
    octet <= 0xf4 ? 4 : undefined
  );

  const ContainsBOM = buffer => buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf;

  Decode = (buffer, fatal, ignoreBOM) => {
    const source = IsUint8Array(buffer) ? buffer : new Uint8Array(buffer);
    const length = TypedArrayLength(source);
    let result = '';
    const startIndex = !ignoreBOM && length >= 3 && ContainsBOM(source) ? 3 : 0;
    for (let i = startIndex; i < length; i++) {
      let octet = source[i];
      const bytes = GetOctetBytes(octet);
      const byte = bytes - 1;
      const sequenceEnd = i + byte;
      if (sequenceEnd < length) {
        let codePoint = octet & MASKS[byte];
        while (i < sequenceEnd) {
          octet = source[++i];
          codePoint = (codePoint << 6) | (octet & 0x3f);
        }
        result += StringFromCodePoint(codePoint);
      } else {
        if (fatal) {
          throw new RangeError('Invalid UTF-8 encoding');
        }
        result += '\ufffd';
      }
    }
    return result;
  }
}

export const encode = string => {
  const $string = ToString(string);
  return Encode($string);
}

export const encodeInto = (string, destination) => {
  const $string = ToString(string);
  if (!IsUint8Array(destination)) {
    throw new TypeError('`destination` is not an instance of Uint8Array');
  }
  return EncodeInto($string, destination);
}

export const decode = (buffer, options) => {
  if (!IsBuffer(buffer)) {
    throw new TypeError('`buffer` is not an instance of ArrayBuffer or ArrayBufferView');
  }
  let fatal = false;
  let ignoreBOM = false;
  if (options !== undefined) {
    if (!IsObject(options)) {
      throw new TypeError('`options` is not an object');
    }
    fatal = !!options.fatal;
    ignoreBOM = !!options.ignoreBOM;
  }
  return Decode(buffer, fatal, ignoreBOM);
}

export const UTF8 = ObjectCreate(ObjectPrototype, {
  encode: {
    value: encode
  },
  encodeInto: {
    value: encodeInto
  },
  decode: {
    value: decode
  },
  [SymbolToStringTag]: {
    value: 'UTF8'
  }
});
export default UTF8;
