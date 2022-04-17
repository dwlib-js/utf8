import BufferSourceAsUint8Array from '#abstract/BufferSourceAsUint8Array';
import IsValidBytes from '#abstract-functions/IsValidBytes';

const isValid = source => {
  const buffer = BufferSourceAsUint8Array(source);
  return IsValidBytes(buffer);
}

export default isValid;
