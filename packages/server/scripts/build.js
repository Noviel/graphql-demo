const path = require('path');
const fs = require('fs');

const ncc = require('@zeit/ncc');

const { getEveryDependency } = require('./dependencies');

const ENTRY_POINT = path.resolve(__dirname, '../src/index.ts');
const OUTPUT = path.resolve(__dirname, '../lib/index.js');

const externals = getEveryDependency(require.resolve('../package.json'), {
  maxDepth: 2,
});

ncc(ENTRY_POINT, {
  externals,
}).then((result) => {
  const { code } = result;
  if (!fs.existsSync(path.resolve(__dirname, '../lib'))) {
    fs.mkdirSync(path.resolve(__dirname, '../lib'));
  }
  fs.writeFileSync(OUTPUT, code);
});
