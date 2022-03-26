import TypeError from '#primordials/TypeError';
import IsUint8Array from '#types/isUint8Array';
import ToString from '#abstract/ToString';
import EncodeTextInto from '#abstract-functions/EncodeTextInto';

const encodeInto = (text, destination) => {
  const string = ToString(text);
  if (!IsUint8Array(destination)) {
    throw new TypeError('destination is not an instance of Uint8Array');
  }
  return EncodeTextInto(string, destination);
}

export default encodeInto;
