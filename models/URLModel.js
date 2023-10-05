const URLModel = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 6,
    },
    shortURL: {
      type: "string",
    },
    originalURL: {
      type: "string",
    },
    clicks: {
      type: "number",
    },
    timestamp: {
      type: "date-time",
    },
  }
};

module.exports = URLModel;