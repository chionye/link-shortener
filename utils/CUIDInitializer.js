const { init } = require("@paralleldrive/cuid2");
const { fingerprint } = require("../config/");

class CUIDInitializer {
  constructor(length) {
    this.generateID = init({
      random: Math.random,
      length,
      fingerprint,
    });
  }
}

module.exports = CUIDInitializer;