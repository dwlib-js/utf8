const IncludesBOM = buffer => buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf;

export default IncludesBOM;
