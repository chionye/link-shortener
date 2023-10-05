const CUIDInitializer = require("./CUIDInitializer");

class UniqueIDGenerator extends CUIDInitializer {
  constructor(length) {
    super(length);
  }
}

module.exports = UniqueIDGenerator;
