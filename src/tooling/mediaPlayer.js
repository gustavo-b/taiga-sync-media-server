const { exec } = require('child_process');
const {
  mediaPlayer: { player },
} = require('../config/env');

const handleExecStdout = (stdout) => console.log(`Proxy stdout: ${stdout}`);
const handleExecStderr = (stderr) => console.log(`Proxy stderr: ${stderr}`);

const runPlayer = (filePath, shellOptions) =>
  exec(`${player} ${filePath}`, shellOptions, (err, stdout, stderr) => {
    if (err) {
      return;
    }

    handleExecStdout(stdout);
    handleExecStderr(stderr);
  });

module.exports = {
  start: (filePath, shellOptions) => {
    runPlayer(filePath, shellOptions);
  },
};
