const extensions = require(__dirname + '/extensions.js');

const extend = (namespace, extension) => {
  extensions[namespace] = extension;
}

module.exports = extend;