const { spawn } = require('child_process');

function execGit(args) {
  /*
  Execute git command with passed arguments.
  <args> is expected to be an array of strings.
  Example: ['fetch', '-pv']
  */
  return new Promise((resolve, reject) => {
    const gitResponse = spawn('git', args, {
      cwd: process.cwd(),
      silent: true
    });

    var retVal = '';

    gitResponse.stdout.on('data', data => {
      retVal += data.toString();
    });

    gitResponse.stdout.on('close', () => {
      resolve(retVal.trim());
    });

    gitResponse.stderr.on('data', stderr => {
      reject(stderr.toString());
    });
  });
}

function checkDir(patchDir) {
  /*
  Check if patch directory is created. Create if not yet created
  */
  return new Promise((resolve, reject) => {
    const checkDir = spawn('mkdir', ['-p', patchDir], {
      cwd: process.cwd(),
      silent: false
    });

    var retVal = '';

    checkDir.stdout.on('data', data => {
      retVal += data.toString();
    });

    checkDir.stdout.on('close', () => {
      resolve(retVal.trim());
    });

    checkDir.stderr.on('data', stderr => {
      reject(stderr.toString());
    });
  });
}

async function createPatchFiles(number, commit, patchDir) {
  /*
  Execute checkDir to ensure directory is created. Call execGit to create patch files.
  @TODO Check for existing files before creating
  */
  await checkDir(patchDir);

  const args = ['format-patch', '-' + number, commit, '-o', patchDir, '-q'];

  await execGit(args);
}

module.exports = {
  createPatchFiles: createPatchFiles
};
