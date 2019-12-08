export const person = info => ({ type: 'ADDINFO', payload: { info } });
export const infos = person => ({ type: 'ADDPERSON', payload: { person } });
