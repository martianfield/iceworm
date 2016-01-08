'use strict';

module.exports = (obj) => {
  if(obj === null || obj === undefined) {
    return obj;
  }
  let parsed = parseInt(obj);
  if(isNaN(parsed)) {
    return undefined;
  }
  return parsed;
}
