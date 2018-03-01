#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const fs = require('fs');
const git = require('./utils/git');
const prompts = require('prompts');

program.version('0.0.1', '-v, --version');

function getPatchFiles(patchDir) {
  if (fs.existsSync(patchDir)) {
    fs.readdir(patchDir, (err, items) => {
      let retVal = ['Some files already exist: '];

      items.forEach(file => {
        retVal.push(chalk.yellow(file));
      });

      const msg = retVal.join('\n');
      console.log('\n' + msg);
    });
  }
}

program
  .command('create')
  .option('-n, --number <number>', 'Number of commits')
  .option('-c, --commit <commit_sha>', 'Git commit sha')
  .option('-d, --directory [directory path]', 'Path for output files')
  .on('--help', () => {
    console.log('');
    console.log('  Examples:');
    console.log('');
    console.log('  $ gtp create -n <number> -c <commit_sha>');
    console.log('  $ gtp create -n 2 -c bdb48c8');
    console.log('');
  })
  .action(async options => {
    const { commit, number, patchDir = './patch_files' } = options;

    const question = {
      type: 'confirm',
      name: 'value',
      message: chalk.yellow('Continue?'),
      initial: false,
    };

    await getPatchFiles(patchDir);

    const response = await prompts(question);

    if (response.value) {
      await git
        .createPatchFiles(number, commit, patchDir)
        .then(() => {
          console.log(chalk.green('Created patch files in ' + patchDir));
        })
        .catch(error => {
          console.log(chalk.yellow('Something went wrong!'));
          console.error(error);
        });
    } else {
      console.log(chalk.yellow('Exiting. Remove files before continuing.'));
    }
  });

program
  .command('apply')
  .on('--help', () => {
    console.log('');
    console.log('  Examples:');
    console.log('');
    console.log('  $ gtp apply');
    console.log('');
  })
  .action(() => {});

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.help();
}
