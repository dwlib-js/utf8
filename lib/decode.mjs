import BufferSourceAsUint8Array from '#abstract/BufferSourceAsUint8Array';
import DecodeString from '#abstract-functions/DecodeString';
import ToErrorMode from '#abstract-functions/ToErrorMode';

const decode = (source, errorMode, ignoreBOM) => {
  const buffer = BufferSourceAsUint8Array(source);
  const mode = errorMode === undefined ? 'replace' : ToErrorMode(errorMode);
  return DecodeString(buffer, mode, ignoreBOM);
}

export default decode;
