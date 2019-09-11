async function breed(father, mother) {
  let synapsesReturn = [];
  for(let i = 0; i < father.synapses.length; i++) {
    if(xor(father.synapses[i].weight, mother.synapses[i].weight === 1)) {
      synapsesReturn.push(father.synapses[i].weight + mother.synapses[i].weight);
    }
    else {
      let pushValue = Math.random() < 0.5 ? father.synapses[i].weight : mother.synapses[i].weight;
      synapsesReturn.push(pushValue);
    }
  }
  return synapsesReturn;
}

function xor(n1,n2) {
  if(n1 <= 0 && n2 <= 0) {
    return 0;
  } else if(n1 >= 0 && n2 >= 0) {
    return 0;
  } else {
    return 1;
  }
}
