/**
 * Decide whether the client-browser is in local network or not
 * @returns {boolean} True if client is in local network, False otherwise
 */
const isLocalIpAddress = () => {
  const { hostname } = window.location;
  return hostname.includes('localhost') || hostname.includes('192.168');
};

/**
 * Back-end URL of our server
 */
export const ROOT_URL = isLocalIpAddress()
  ? process.env.REACT_APP_ROOT_URL_LOCAL
  : process.env.REACT_APP_ROOT_URL_REMOTE;

/**
 * Back-end URL of the legacy (old) system
 */
export const LEGACY_URL = isLocalIpAddress()
  ? process.env.REACT_APP_LEGACY_URL_LOCAL
  : process.env.REACT_APP_LEGACY_URL_REMOTE;

/**
 * Token refresh limit equals to 10 minutes
 * @type {number} in seconds
 */
export const TOKEN_REFRESH_LIMIT = 30 * 60;
export const TOKEN_PASSWORD = 'secret'; // so genious :)

export const YEAR_OPTIONS = [
  {
    key: 2017,
    text: 2017,
    value: 2017,
  },
  {
    key: 2018,
    text: 2018,
    value: 2018,
  },
  {
    key: 2019,
    text: 2019,
    value: 2019,
  },
];

export const MONTH_OPTIONS = [
  {
    key: 1,
    text: 'Январь',
    value: 1,
  },
  {
    key: 2,
    text: 'Февраль',
    value: 2,
  },
  {
    key: 3,
    text: 'Март',
    value: 3,
  },
  {
    key: 4,
    text: 'Апрель',
    value: 4,
  },
  {
    key: 5,
    text: 'Май',
    value: 5,
  },
  {
    key: 6,
    text: 'Июнь',
    value: 6,
  },
  {
    key: 7,
    text: 'Июль',
    value: 7,
  },
  {
    key: 8,
    text: 'Август',
    value: 8,
  },
  {
    key: 9,
    text: 'Сентябрь',
    value: 9,
  },
  {
    key: 10,
    text: 'Октябрь',
    value: 10,
  },
  {
    key: 11,
    text: 'Ноябрь',
    value: 11,
  },
  {
    key: 12,
    text: 'Декабрь',
    value: 12,
  },
];

export const outCallStatusColorMap = {
  0: 'grey',
  2: 'green',
  3: 'blue',
  4: 'orange',
  5: 'black',
};

export const DEFAULT_LANGUAGE = 'ru';

export const EDU_CEB_ASSETS_URL =
  'http://192.168.0.15/assets/images/prod/education/assetsCebilon/';
