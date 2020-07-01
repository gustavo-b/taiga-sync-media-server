const { defaultShellOptions: shellOptions } = require('./src/config/env');

const proxy = require('./src/servers/proxy');
const mediaServer = require('./src/servers/mediaServer');

proxy.start(shellOptions);
mediaServer.start(shellOptions);
