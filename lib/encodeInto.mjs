import TypeError from '#primordials/TypeError';
import IsUint8Array from '#types/isUint8Array';
import ToString from '#abstract/ToString';
import EncodeStringInto from '#abstract-functions/EncodeStringInto';

const encodeInto = (string, destination) => {
  const chars = ToString(string);
  if (!IsUint8Array(destination)) {
    throw new TypeError('destination is not an instance of Uint8Array');
  }
  return EncodeStringInto(chars, destination);
}

export default encodeInto;
