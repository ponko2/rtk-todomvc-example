/* eslint no-param-reassign: "off" */

module.exports = (path, options) => {
  return options.defaultResolver(path, {
    ...options,
    packageFilter(pkg) {
      if (pkg.name === "dexie") {
        delete pkg.exports;
        delete pkg.module;
      }
      return pkg;
    },
  });
};
