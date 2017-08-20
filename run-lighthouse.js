#! /usr/bin/env node

const fs = require('fs');
const argv = require('yargs').argv;
const childProcess = require('child_process');

const path = require('path');

const fileName = argv.file;

const file = fs.readdirSync(__dirname).filter(f => f === fileName)[0];
const nowUrl = fs.readFileSync(file).toString();

// bail, we did not get the URL
if (!nowUrl) process.exit(1);

const lighthouseCi = path.resolve(__dirname, 'node_modules', 'lighthouse-ci');
const child = childProcess.fork(lighthouseCi, ['--score', 93, nowUrl]);

child.on('error', (err) => {
  console.error(err);
  process.exit(1);
});
