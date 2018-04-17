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

const __calculateStackProgress = (stack) => {
  // situation & clear are not questions, so we will subtract them from the total
  // 45 questions (47-2)
  let runningTotal = 45;
  let total = add(stack.intro) + add(stack.dark) + add(stack.drift) + add(stack.shift) + add(stack.lift) + add(stack.light);
  let result = eval((total / runningTotal).toFixed(2));

  return result;
}

const add = (chunk) => {
  let total = 0;
  Object.keys(chunk).forEach((item) => {
      if(chunk[item].constructor === Array ? chunk[item].length > 0 : chunk[item] !== '') {
          total += 1;
      }
  });

  return total;
}

const __isSameDay = (d1, d2) => {
  return d1.getFullYear() === d2.getFullYear()
    && d1.getDate() === d2.getDate()
    && d1.getMonth() === d2.getMonth();
}


export { __get, __set, __validate, __getRandomInt, __dataFilter, __calculateStackProgress, __isSameDay }
