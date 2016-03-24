module.exports = (obj) => {
  if(obj === null || obj === undefined) {
    return obj
  }
  return String(obj)
}
