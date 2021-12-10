module.exports = {
  target: "webworker",
  node: {
    fs: "empty",
    tls: "empty",
    net: "empty",
  },
};
