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
      silent: true,
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

async function applyPatchFiles(patchDir) {

};

async function createDir(patchDir) {
  /*
  Check if patch directory is created. Create if not yet created
  */
  return new Promise((resolve, reject) => {
    console.log('Creating ' + patchDir);
    const createDir = spawn('mkdir', ['-p', patchDir], {
      cwd: process.cwd(),
      silent: false,
    });

    var retVal = '';

    createDir.stdout.on('data', data => {
      retVal += data.toString();
    });

    createDir.stdout.on('close', () => {
      resolve(retVal.trim());
    });

    createDir.stderr.on('data', stderr => {
      reject(stderr.toString());
    });
  });
}

async function createPatchFiles(number, commit, patchDir) {
  /*
  Execute createDir to ensure directory is created. Call execGit to create patch files.
  */
  await createDir(patchDir);

  const args = ['format-patch', '-' + number, commit, '-o', patchDir, '-q'];

  await execGit(args);
};

async function deletePatchFiles(patchDir) {

};

module.exports = {
  applyPatchFiles: applyPatchFiles,
  createPatchFiles: createPatchFiles,
  deletePatchFiles: deletePatchFiles,
};
