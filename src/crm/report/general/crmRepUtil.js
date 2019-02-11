import moment from 'moment';

export const REP_740 = 740;
export const REP_894 = 894;
export const REP_914 = 914;
export const REP_934 = 934;
export const REP_935 = 935;

export const REP_SALE_DEMO_ID = 894;
export const REP_DEMO_ID = 935;

export const countedYearMonthsMap = () => {
  const out = [];
  let mCounter = 0;
  let date = moment();
  while (true) {
    let tempMonth = parseInt(date.format('M'), 10);
    if (tempMonth === 8 || tempMonth === 1) {
    } else {
      out.push({
        y: date.format('Y'),
        m: tempMonth,
      });
      mCounter++;
    }

    date = date.subtract(1, 'month');
    if (mCounter === 4) {
      break;
    }
  }
  return out;
};
