#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const git = require('./utils/git');

program.version('0.0.1', '-v, --version');

program
  .command('create')
  .option('-n, --number <number>', 'Number of commits')
  .option('-c, --commit <commit_sha>', 'Git commit sha')
  .action((options) => {
    const { commit, number } = options;
    const patchDir = './patch_files';

    git.createPatchFiles(number, commit, patchDir).then(() => {
      console.log(chalk.green('Created patch files in ' + patchDir));
    }).catch((error) => {
      console.log(chalk.yellow('Something went wrong!'));
      console.error(error);
    });
  }).on('--help', () => {
    console.log('');
    console.log('  Examples:');
    console.log('');
    console.log('  $ gtp create -n <number> -c <commit_sha>');
    console.log('  $ gtp create -n 2 -c bdb48c8')
    console.log('');
  })

program.on('--help', () => {
  console.log('')
});

program.parse(process.argv);
if (!process.argv.slice(2).length) {
  program.help();
}
