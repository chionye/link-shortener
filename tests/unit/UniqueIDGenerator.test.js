const UniqueIDGenerator = require("../../utils/UniqueIDGenerator");

describe("UniqueIDGenerator", () => {
  test("should generate unique IDs with the specified length", () => {
    const idLength = 6;
    const idGenerator = new UniqueIDGenerator(idLength);

    // Generate a set of IDs
    const idSet = new Set();
    const numberOfIDsToGenerate = 100;

    for (let i = 0; i < numberOfIDsToGenerate; i++) {
      const uniqueID = idGenerator.generateID();
      // Check the length of the generated ID
      expect(uniqueID.length).toBe(idLength);
      // Check if the ID is unique within the set
      expect(idSet.has(uniqueID)).toBe(false);
      idSet.add(uniqueID);
    }
  });
});
