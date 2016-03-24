const cache = {
  schemas:{},
  purge: (target) => {
    if(target === undefined) {
      this.schemas = {}
    }
    else {
      this[target] = {}
    }
  }
}


module.exports = cache