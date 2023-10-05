require("fake-indexeddb/auto");
const { createRxDatabase, addRxPlugin } = require("rxdb");
const { getRxStorageDexie } = require("rxdb/plugins/storage-dexie");
const { RxDBDevModePlugin } = require("rxdb/plugins/dev-mode");
const { RxDBUpdatePlugin } = require("rxdb/plugins/update");
const StorageService = require("../services/StorageService");
const URLModel = require("../models/URLModel");

addRxPlugin(RxDBUpdatePlugin);

class Storage {
  constructor() {
    this.db = null;
    this.repository = null;
  }

  async initializeDatabase() {
    try {
      this.db = await createRxDatabase({
        name: "myurldb",
        storage: getRxStorageDexie(),
      });

      await this.db.addCollections({
        myurldb: {
          schema: URLModel,
        },
      });

      this.repository = new StorageService(this.db);
    } catch (error) {
      console.error("Error initializing database:", error);
      throw error;
    }
  }
}

module.exports = Storage;
