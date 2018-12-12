import namor from 'namor';

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newContract = () => {
  const statusChance = Math.random();
  return {
    SNcontract: Math.floor(Math.random() * 100000),
    contractDate: randomDate(new Date(2012, 0, 1), new Date()).toDateString(),
    fio: namor.generate({ words: 3, numbers: 0 }),
    branch: namor.generate({ words: 1, numbers: 0 }),
    product: namor.generate({ words: 1, numbers: 0 }),
    dealer: namor.generate({ words: 3, numbers: 0 }),
    state: namor.generate({ words: 1, numbers: 0 }),
    lastNote: namor.generate({ words: 4, numbers: 0 }),
    updated: randomDate(new Date(2012, 0, 1), new Date()).toDateString(),
    operator:
      statusChance > 0.66
        ? 'Nagima'
        : statusChance > 0.33
        ? 'Raushan'
        : 'Assel',
  };
};

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

export function makeData(len = 5553) {
  return range(len).map(d => ({
    ...newContract(),
    children: range(10).map(newContract),
  }));
}
