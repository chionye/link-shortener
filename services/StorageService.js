
//This class contains the save, findById and findByIdandUpdate methods for crud operations

class StorageService {
  constructor(db) {
    this.db = db;
    this.collection = db.myurldb;
  }

  async save(url) {
    try {
      await this.collection.insert(url);
      return url.shortURL;
    } catch (error) {
      return null;
    }
  }

  async findById(id) {
    try {
      const documents = await this.collection.findOne({
        selector: {
          id: {
            $eq: id,
          },
        },
      }).exec();
      if (documents) {
        const result = documents.toJSON();
        return result;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error retrieving documents:", error);
      throw error;
    }
  }

  async findByIdandUpdate(id, obj) {
    try {
      const documents = await this.collection.findOne({
        selector: {
          id: {
            $eq: id,
          },
        },
      });
      await documents.update(obj);

      return documents._result.docs.length > 0
        ? documents._result.docs[0]._data.originalURL
        : null;
    } catch (error) {
      console.error("Error retrieving documents:", error);
      throw error;
    }
  }
}

module.exports = StorageService;
