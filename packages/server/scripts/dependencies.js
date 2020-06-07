import merge from 'deepmerge';
import match from 'minimatch';

const isPassIncudeExclude = (value, include, exclude) => {
  let shouldBeIncluded = include.length > 0;
  let isIncluded = false;

  for (const inc of include) {
    if (typeof inc === 'string') {
      if (match(value, inc)) {
        isIncluded = true;
        break;
      }
    } else if (inc instanceof RegExp) {
      if (inc.test(value)) {
        isIncluded = true;
        break;
      }
    }
  }

  if (!isIncluded && shouldBeIncluded) {
    return false;
  }

  for (const ex of exclude) {
    if (typeof ex === 'string') {
      if (match(value, ex)) {
        return false;
      }
    } else if (ex instanceof RegExp) {
      if (ex.test(value)) {
        return false;
      }
    }
  }

  return true;
};

const GET_EVERY_DEPENDENCY_DEFAULT_OPTIONS = {
  maxDepth: 1,
  include: [],
  exclude: [],
};

function getEveryDependency(pathToPackageJSON, options = GET_EVERY_DEPENDENCY_DEFAULT_OPTIONS) {
  const { maxDepth = 1, exclude = [], include = [] } = merge(GET_EVERY_DEPENDENCY_DEFAULT_OPTIONS, options);
  const getDeps = (pathToPackage, currDepth) => {
    const deps = require(pathToPackage).dependencies || {};
    let depsList = Object.keys(deps);

    if (exclude.length || include.length) {
      depsList = depsList.filter((d) => isPassIncudeExclude(d, include, exclude));
    }

    let tail = [];
    if (currDepth < maxDepth) {
      tail = depsList.map((d) => getDeps(d + '/package.json', currDepth + 1));
    }

    // filter out duplicates
    return Array.from(new Set([...depsList, ...tail].reduce((acc, val) => acc.concat(val), [])));
  };

  return getDeps(pathToPackageJSON, 0);
}

module.exports = {
  getEveryDependency
}