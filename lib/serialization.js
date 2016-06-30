
function bytesToBits(...bytes) {

  let bits = [];

  bytes.map(byte => {

    for (let i = 0; i < 8; i++) {

      bits.push(!!(byte & (1 << 7 - i)));

    }

  });

  return bits;

}

function bitsToBytes(...bits) {

  let bytes = [];

  bits.map((bit, i) => {

    let byteIndex = Math.floor(i / 8),
      value = bit ? 1 << (7 - i % 8) : 0;
    bytes[byteIndex] = (bytes[byteIndex] || 0) + value;

  });

  return bytes;

}

  function doublesToBits(doubleValues) {

    let buffer = new Buffer(8),
      bits = [];
    doubleValues.map(doubleValue => {

      buffer.writeDoubleLE(doubleValue, 0);

      for (let byteValue of buffer.values()) {

        bits.push(...bytesToBits(byteValue));

      }

    });

    return bits;

}

function bitsToDoubles(bits) {

  let buffer = Buffer.from(bitsToBytes(...bits)),
    count = bits.length / 64,
    doubles = [];

  for (let i = 0; i < count; i++) {

    doubles.push(buffer.readDoubleLE(i * 8));

  }

  return doubles;

}
