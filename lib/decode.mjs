import BufferSourceAsUint8Array from '#abstract/BufferSourceAsUint8Array';
import DecodeText from '#abstract-functions/DecodeText';
import DecodeTextOrThrow from '#abstract-functions/DecodeTextOrThrow';

const decode = (source, fatal, ignoreBOM) => {
  const buffer = BufferSourceAsUint8Array(source);
  return fatal ? DecodeTextOrThrow(buffer, ignoreBOM) : DecodeText(buffer, ignoreBOM);
}

export default decode;
