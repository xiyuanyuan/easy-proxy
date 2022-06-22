const fs = require("fs");
const path = require("path");

const EASY_PROXY_CONFIG_NAME = "easy-proxy.config.json";
const ERROR_MESSAGES = {
  NOT_FOUND_CONFIG_FILE: `Cannot found config file ${EASY_PROXY_CONFIG_NAME}`,
};

const DEFAULT_CONFIG = {
  proxy: {
    "/api": {
      target: "<url>",
      changeOrigin: true,
    },
    "/foo": {
      target: "<other_url>",
      changeOrigin: true,
      pathRewrite: {
        "^/prod-api": "", // 在向服务端发起请求时，去掉标识xhr的前缀
      },
    },
  },
  port: 8888,
};

const readEasyProxyConfig = () => {
//   const configPath = path.join(__dirname, EASY_PROXY_CONFIG_NAME);
const configPath = path.resolve(EASY_PROXY_CONFIG_NAME)

  console.log('-------', path.resolve(configPath))
  if (!fs.existsSync(path.resolve(configPath))) {
    throw new Error(ERROR_MESSAGES.NOT_FOUND_CONFIG_FILE);
  }
  return require(configPath);
};

module.exports = {
  readEasyProxyConfig,
  DEFAULT_CONFIG,
  EASY_PROXY_CONFIG_NAME,
};