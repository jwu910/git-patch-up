const program = require('commander');
const chalk = require('chalk');

program.version('0.0.1', '-v, --version');

program
	.arguments('<count> <gitSha>')
	.action((count, gitSha) => {
		numOfCommits = count;
		startSha = gitSha;

		// Establish dir to store patch files
		// Check existing patch files
		// Take arguments and search for git commit matching sha
			// Resolve error if none found
			// If sha found, # of commits past starting sha
			
	})

program.parse(process.argv);