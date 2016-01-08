module.exports = (obj) => {
  if(obj === null || obj === undefined) {
    return obj;
  }
  if(String(obj).trim().toLowerCase() === 'false') {
    return false;
  }
  return Boolean(obj);
}
