# UTF8

## Install
`npm i --save @dwlib/utf8`

## Usage
```javascript
// CJS
const UTF8 = require('@dwlib/utf8');
const UTF8Decode = require('@dwlib/utf8/decode');
const UTF8Encode = require('@dwlib/utf8/encode');
const UTF8EncodeInto = require('@dwlib/utf8/encodeInto');
const DecodeText = require('@dwlib/utf8/abstract/DecodeText');
const DecodeTextOrThrow = require('@dwlib/utf8/abstract/DecodeTextOrThrow');
const EncodeText = require('@dwlib/utf8/abstract/EncodeText');
const EncodeTextInto = require('@dwlib/utf8/abstract/EncodeTextInto');
const GetMaxByteCount = require('@dwlib/utf8/abstract/GetMaxByteCount');
const IncludesBOM = require('@dwlib/utf8/abstract/IncludesBOM');
const ThrowInvalidCodePointError = require('@dwlib/utf8/abstract/ThrowInvalidCodePointError');
const ThrowInvalidSequenceError = require('@dwlib/utf8/abstract/ThrowInvalidSequenceError');
// ESM
import UTF8 from '@dwlib/utf8';
import UTF8Decode from '@dwlib/utf8/decode';
import UTF8Encode from '@dwlib/utf8/encode';
import UTF8EncodeInto from '@dwlib/utf8/encodeInto';
import DecodeText from '@dwlib/utf8/abstract/DecodeText';
import DecodeTextOrThrow from '@dwlib/utf8/abstract/DecodeTextOrThrow';
import EncodeText from '@dwlib/utf8/abstract/EncodeText';
import EncodeTextInto from '@dwlib/utf8/abstract/EncodeTextInto';
import GetMaxByteCount from '@dwlib/utf8/abstract/GetMaxByteCount';
import IncludesBOM from '@dwlib/utf8/abstract/IncludesBOM';
import ThrowInvalidCodePointError from '@dwlib/utf8/abstract/ThrowInvalidCodePointError';
import ThrowInvalidSequenceError from '@dwlib/utf8/abstract/ThrowInvalidSequenceError';
```
