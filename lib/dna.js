
function toDna(...bits) {
  let dna = [];
  for(let i = 0; i < bits.length; i += 2) {
    let a = bits[i],
      b = bits[i + 1];
    dna.push(o(a,b));
  }
  return dna.join('');
}

function o(a,b) {
  switch(true) {
    case !a && !b: return 'g';
    case !a && b: return 'a';
    case a && !b: return 't';
    default: return 'c';
  }
}
