const http = require('http');
const httpProxy = require('http-proxy');
const mediaPlayer = require('../tooling/mediaPlayer');
const {
  proxy: { port: proxyPort, taigaTrackableFileExtensions },
  mediaServer: { host: mediaServerHost, port: mediaServerPort },
} = require('../config/env');

const proxy = httpProxy.createProxyServer({});

const shouldTaigaTrackFile = (filePath) => {
  const filePathValidator = new RegExp(
    `\.(${taigaTrackableFileExtensions.join('|')})$`,
  );
  return !!filePath && filePathValidator.test(filePath);
};

const server = (shellOptions) =>
  http.createServer(function (req, res) {
    proxy.web(req, res, {
      target: `http://${mediaServerHost}:${mediaServerPort}`,
    });

    if (shouldTaigaTrackFile(req.url)) {
      mediaPlayer.start(`".${decodeURI(req.url)}"`, shellOptions);
    }
  });

module.exports = {
  start: (shellOptions) => {
    console.log(`Proxy listening on port ${proxyPort}`);
    server(shellOptions).listen(proxyPort);
  },
};
