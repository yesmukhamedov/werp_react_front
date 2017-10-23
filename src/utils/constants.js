/**
 * Decide whether the client-browser is in local network or not
 * @returns {boolean} True if client is in local network, False otherwise
 */
const isLocalIpAddress = () => {
    const hostname = window.location.hostname;
    return hostname.includes('localhost') || hostname.includes('192.168');
};

/**
 * Back-end URL of our server
 */
export const ROOT_URL = isLocalIpAddress() ?
    process.env.REACT_APP_ROOT_URL_LOCAL :
    process.env.REACT_APP_ROOT_URL_REMOTE;

/**
 * Back-end URL of the legacy (old) system
 */
export const LEGACY_URL = isLocalIpAddress() ?
    process.env.REACT_APP_LEGACY_URL_LOCAL :
    process.env.REACT_APP_LEGACY_URL_REMOTE;

/**
 * Token refresh limit equals to 5 minutes
 * @type {number} in seconds
 */
export const TOKEN_REFRESH_LIMIT = 5 * 60 * 1000;
