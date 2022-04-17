import DecodeStringBreak from './DecodeStringBreak.mjs';
import DecodeStringIgnore from './DecodeStringIgnore.mjs';
import DecodeStringReplace from './DecodeStringReplace.mjs';
import DecodeStringStrict from './DecodeStringStrict.mjs';

const DecodeString = (buffer, errorMode, ignoreBOM) => {
  const decode = (
    errorMode === 'strict' ? DecodeStringStrict :
    errorMode === 'break' ? DecodeStringBreak :
    errorMode === 'ignore' ? DecodeStringIgnore : DecodeStringReplace
  );
  return decode(buffer, ignoreBOM);
}

export default DecodeString;
