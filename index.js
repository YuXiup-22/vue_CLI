#!/usr/bin/env node

// console.log('cli_yuxi');
// console.log(process);

const program = require('commander')

const helpOptions = require('./lib/core/help')
const creatCommand = require('./lib/core/create')
program.version(require('./package.json').version)

helpOptions()
creatCommand()

program.parse(process.argv)

