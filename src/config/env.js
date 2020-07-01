module.exports = {
  defaultShellOptions: {
    shell: 'powershell',
    cwd: `${process.env.HOME}/Videos`,
  },
  mediaServer: {
    host: 'localhost',
    port: 37370,
    shell: { command: 'npx', parameters: ['http-server', '-p', '37370'] },
  },
  proxy: { port: 8000, taigaTrackableFileExtensions: ['mkv', 'mp4'] },
  mediaPlayer: { player: 'mpv' },
};
