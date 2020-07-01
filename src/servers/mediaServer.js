const { spawn } = require('child_process');
const {
  mediaServer: {
    port,
    shell: { command, parameters },
  },
} = require('../config/env');

const spawnShell = (shellOptions) => spawn(command, parameters, shellOptions);

const shellStdoutOnData = (chunk) => {
  const output = chunk.toString();
  process.stdout.write(output);
};

const shellStderrOnData = (chunk) => {
  process.stdout.write(`ERROR: ${chunk.toString()}`);
};

const shellOnExit = (code, signal) => {
  const exitMessage = !!code
    ? `child process exited with code ${code}`
    : `child process exited by signal ${signal}`;
  console.log(exitMessage);
  process.exit(1);
};

const setupStreams = (shell) => {
  shell.stdout.on('data', shellStdoutOnData);
  shell.stderr.on('data', shellStderrOnData);
  shell.on('exit', shellOnExit);
};

module.exports = {
  start: (shellOptions) => {
    console.log(`Media server listening on port ${port}`);
    const shell = spawnShell(shellOptions);
    setupStreams(shell);
  },
};
