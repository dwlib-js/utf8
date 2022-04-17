import ToString from '#abstract/ToString';
import EncodeString from '#abstract-functions/EncodeString';

const encode = string => {
  const chars = ToString(string);
  return EncodeString(chars);
}

export default encode;
