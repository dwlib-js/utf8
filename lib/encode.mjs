import ToString from '#abstract/ToString';
import EncodeText from '#abstract-functions/EncodeText';

const encode = text => {
  const string = ToString(text);
  return EncodeText(string);
}

export default encode;
