'use strict'

module.exports = (obj, fieldInfo) => {
  // null, undefined, and non-arrays simply return an empty array
  if(obj === null || obj === undefined || obj.constructor !== Array) {
    return []
  }

  let result = []
  let project = fieldInfo.projector()
  obj.forEach((item) => {
    result.push(project(item))
  })

  return result
}
