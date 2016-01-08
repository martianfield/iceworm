module.exports = (obj) => {
  if(obj === null || obj === undefined) {
    obj = '';
  }
  return String(obj);
}
