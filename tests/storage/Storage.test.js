/** @format */

// Import necessary modules and plugins
const { createRxDatabase } = require("rxdb"); // Remove addRxPlugin import
const { getRxStorageDexie } = require("rxdb/plugins/storage-dexie");
const { RxDBDevModePlugin } = require("rxdb/plugins/dev-mode");
const StorageService = require("../../services/StorageService");
const URLModel = require("../../models/URLModel");

// Mock the console.error method to prevent error logs during tests
console.error = jest.fn();

// Mock the RxDB plugins and functions
jest.mock("rxdb/plugins/storage-dexie", () => ({
  getRxStorageDexie: jest.fn(),
}));

// Mock the createRxDatabase and addRxPlugin functions
jest.mock("rxdb", () => {
  const db = {
    addCollections: jest.fn(),
  };

  return {
    createRxDatabase: jest.fn().mockResolvedValue(db),
    addRxPlugin: jest.fn(),
  };
});

// Import the Storage class
const Storage = require("../../database/Storage");

describe("Storage Class", () => {
  let storage;

  beforeAll(() => {
    // Initialize the Storage instance
    storage = new Storage();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize the database", async () => {
    await storage.initializeDatabase();

    expect(createRxDatabase).toHaveBeenCalledWith({
      name: "myurldb",
      storage: getRxStorageDexie(),
    });

    expect(storage.db.addCollections).toHaveBeenCalledWith({
      myurldb: {
        schema: URLModel,
      },
    });

    expect(console.error).not.toHaveBeenCalled();
  });

  it("should handle errors during database initialization", async () => {
    // Mock the createRxDatabase function to throw an error
    createRxDatabase.mockRejectedValueOnce(
      new Error("Database initialization error")
    );

    await expect(storage.initializeDatabase()).rejects.toThrowError(
      "Database initialization error"
    );

    expect(console.error).toHaveBeenCalledWith(
      "Error initializing database:",
      expect.any(Error)
    );
  });
});