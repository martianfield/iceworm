'use strict'

module.exports = (obj, fieldInfo) => {
  // null, undefined, and non-arrays simply return an empty array
  if(obj === null || obj === undefined || obj.constructor !== Array) {
    return []
  }

  let result = []
  let patch = fieldInfo.patcher()
  obj.forEach((item) => {
    result.push(patch(item))
  })

  return result
}
