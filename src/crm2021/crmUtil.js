export const DEMO_RESULT_DONE = 'DONE';
export const DEMO_RESULT_MOVED = 'MOVED';
export const DEMO_RESULT_CANCELLED = 'CANCELLED';
export const DEMO_RESULT_SOLD = 'SOLD';

export const DEMO_RESULT_OPTIONS = [
  {
    key: DEMO_RESULT_DONE,
    value: DEMO_RESULT_DONE,
    text: 'Пройден',
  },

  {
    key: DEMO_RESULT_MOVED,
    value: DEMO_RESULT_MOVED,
    text: 'Перенос',
  },

  {
    key: DEMO_RESULT_CANCELLED,
    value: DEMO_RESULT_CANCELLED,
    text: 'Отменен',
  },

  {
    key: DEMO_RESULT_SOLD,
    value: DEMO_RESULT_SOLD,
    text: 'Продан',
  },
];

// CALL RESULTS
export const CALL_RESULT_DEMO = 'POSITIVE';
export const CALL_RESULT_REFUSE = 'REJECT';
export const CALL_RESULT_RECALL = 'RECALL';
export const CALL_RESULT_NOT_AVAILABLE = 'NOT_AVAILABLE';
export const CALL_RESULT_NO_ANSWER = 'NO_ANSWER';

export const LOCATION_OPTIONS = [
  {
    key: 1,
    text: 'Город',
    value: 1,
  },
  {
    key: 2,
    text: 'ЗАгород',
    value: 2,
  },
];

export const RECO_CATEGORIES = [
  {
    key: 1,
    text: 'Золото',
    value: 'GOLD',
  },
  {
    key: 2,
    text: 'Серебро',
    value: 'SILVER',
  },
  {
    key: 3,
    text: 'Бронза',
    value: 'BRONZE',
  },
];

export const getRecoCategoriesOptionsByLanguage = language => {
  if (language === 'en' || language === 'tr') {
    return [
      {
        key: 1,
        text: 'Gold',
        value: 1,
      },
      {
        key: 2,
        text: 'Silver',
        value: 2,
      },
      {
        key: 3,
        text: 'Bronze',
        value: 3,
      },
    ];
  }

  return RECO_CATEGORIES;
};

export const RECO_SWITCH_OPTIONS = [
  {
    key: 0,
    text: 'В любое время',
    value: 0,
  },
  {
    key: 1,
    text: 'Задать дату',
    value: 1,
  },
];

export const RECO_CALLER_OPTIONS = [
  {
    key: 0,
    text: 'Секретарь',
    value: 0,
  },
  {
    key: 1,
    text: 'Дилер',
    value: 1,
  },
];

export const RECO_CATEGORY_COLORS = {
  GOLD: 'orange',
  SILVER: 'olive',
  BRONZE: 'brown',
  null: 'grey',
};

export const getCallerOptionsByLanguage = language => {
  if (language === 'en' || language == 'tr') {
    return [
      {
        key: 0,
        text: 'Demo Secretary',
        value: 0,
      },
      {
        key: 1,
        text: 'Dealer',
        value: 1,
      },
    ];
  }

  return RECO_CALLER_OPTIONS;
};

export const getLocationOptionsByLanguage = language => {
  if (language === 'en') {
    return [
      {
        key: 'IN_CITY',
        text: 'City',
        value: 'IN_CITY',
      },
      {
        key: 'IN_COUNTRYSIDE',
        text: 'Countryside',
        value: 'IN_COUNTRYSIDE',
      },
    ];
  } else if (language === 'tr') {
    return [
      {
        key: 'IN_CITY',
        text: 'City',
        value: 'IN_CITY',
      },
      {
        key: 'IN_COUNTRYSIDE',
        text: 'Countryside',
        value: 'IN_COUNTRYSIDE',
      },
    ];
  }

  return [
    {
      key: 'IN_CITY',
      text: 'Город',
      value: 'IN_CITY',
    },
    {
      key: 'IN_COUNTRYSIDE',
      text: 'ЗАгород',
      value: 'IN_COUNTRYSIDE',
    },
  ];
};

export function getReasonsByResultId(resultId, reasons) {
  let reasonTypeId = 0;
  console.log('RESULT ID: ', reasons);
  if (resultId === DEMO_RESULT_DONE) {
    reasonTypeId = 'DEMO_REFUSE';
  } else if (resultId === DEMO_RESULT_CANCELLED) {
    reasonTypeId = 'DEMO_CANCEL';
  } else if (resultId === DEMO_RESULT_MOVED) {
    reasonTypeId = 'DEMO_MOVE';
  }

  const out = [];
  for (const k in reasons) {
    if (reasons[k].type === reasonTypeId) {
      out.push({
        key: reasons[k].id,
        text: reasons[k].name,
        value: reasons[k].id,
      });
    }
  }

  return out;
}

export function demoResultOptions(results) {
  if (!results) {
    return [];
  }

  const out = Object.keys(results).map(k => ({
    // key: k,
    text: results[k],
    value: k,
  }));

  return out;
}

export function callColor(resultId) {
  switch (resultId) {
    case CALL_RESULT_DEMO:
      return 'green';

    case CALL_RESULT_RECALL:
      return 'brown';

    case CALL_RESULT_REFUSE:
      return 'red';

    default:
      return 'grey';
  }
}
