const __get = (p, o) => p.reduce((xs, x) => (xs && xs[x]!=='') ? xs[x] : null, o);
const __set = (p, o) => p.reduce((xs, x) => ({[x]: xs}), o);
const __validate = (data) => Object.entries(data).every(([key, val]) => val.constructor === Array ? val.length > 0 : val !== '');
const __getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

const arraytoString = (feelings) => {
    let feelingStr =  feelings.toString().replace(/,/g, ", ");
    if(feelings.length > 1) {
       return feelingStr.replace(/,(?=[^,]*$)/, ' and');
    }
    return feelingStr.toLowerCase();
}

const __dataFilter = (string, intro, index = '') => {
  let newString = string
  .replace(/\[intro(.|\n)username\]/gi, intro.username)
  .replace(/\[intro(.|\n)who\]/gi, intro.who)
  .replace(/\[index]/gi, index === 1 ? '' : index)
  .replace(/\[intro(.|\n)feeling\]/gi, arraytoString(intro.feeling));
  return newString;
}

export { __get, __set, __validate, __getRandomInt, __dataFilter }
