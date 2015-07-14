#!/usr/bin/env node

/* Must run before running this script: `npm link shelljs` or `npm install shelljs` */

var shell = require('shelljs/global')
var pkgJson = require('./package.json')

var deps = pkgJson.devDependencies
for (dep in deps) {
    exec('sudo npm link ' + dep + '@' + deps[dep])
}
