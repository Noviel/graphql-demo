const path = require('path');
const fs = require('fs-extra');

const ncc = require('@zeit/ncc');

const { getEveryDependency } = require('./dependencies');

const ENTRY_POINT = path.resolve(__dirname, '../src/index.ts');
const OUTPUT = path.resolve(__dirname, '../lib/index.js');

const SCHEMA_INPUT = path.resolve(__dirname, '../src/schema.graphql');
const SCHEMA_OUTPUT = path.resolve(__dirname, '../lib/schema.graphql');

const externals = getEveryDependency(require.resolve('../package.json'), {
  maxDepth: 2,
  exclude: [/^@graphql-demo/],
});

function compile(options = {}) {
  const watch = options.watch || false;

  function save(build) {
    const { code } = build;
    if (!fs.existsSync(path.resolve(__dirname, '../lib'))) {
      fs.mkdirSync(path.resolve(__dirname, '../lib'));
    }
    fs.writeFileSync(OUTPUT, code);
    fs.copyFileSync(SCHEMA_INPUT, SCHEMA_OUTPUT);

    console.log('Compilation complete.');
  }

  if (watch) {
    const { handler, rebuild } = ncc(ENTRY_POINT, {
      externals,
      watch,
    });
    handler(save);
    rebuild(() => {
      console.log('Recompiling...');
    });
  } else {
    ncc(ENTRY_POINT, {
      externals,
    }).then(save);
  }
}

module.exports.compile = compile;
