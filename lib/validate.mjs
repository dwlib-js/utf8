import BufferSourceAsUint8Array from '#abstract/BufferSourceAsUint8Array';
import ValidateBytes from '#abstract-functions/ValidateBytes';

const validate = source => {
  const buffer = BufferSourceAsUint8Array(source);
  return ValidateBytes(buffer);
}

export default validate;
