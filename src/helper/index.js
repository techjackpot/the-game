const __get = (p, o) => p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o);
const __set = (p, o) => p.reduce((xs, x) => ({[x]: xs}), o);

export { __get, __set }
