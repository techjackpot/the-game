const __get = (p, o) => p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o);
const __set = (p, o) => p.reduce((xs, x) => ({[x]: xs}), o);
const __validate = (data) => Object.entries(data).every(([key, val]) => val.constructor === Array ? val.length > 0 : val !== '');

export { __get, __set, __validate }
