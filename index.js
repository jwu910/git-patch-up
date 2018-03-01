#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const git = require('./utils/git');

program.version('0.0.1', '-v, --version');

program
  .option('-n, --number <number>', 'Number of commits')
  .option('-c, --commit <commit_sha>', 'Git commit sha')
  .parse(process.argv);

const { commit, number } = program;
const patchDir = './patch_files';

git.createPatchFiles(number, commit, patchDir).then(() => {
  console.log(chalk.green('Created patch files in ' + patchDir));
});

program.on('--help', function() {
  console.log('  Examples:');
  console.log('');
  console.log('    $ gtp -n 5 -c 4c2615da4c02dd2602b969e5457bfa5e77085238');
  console.log(
    '    $ // Will create 5 patch files for the 5 most recent commits starting with the provided git SHA'
  );
  console.log('');
});

if (!process.argv.slice(2).length) {
  program.help();
}
