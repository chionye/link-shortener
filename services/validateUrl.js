class ValidateUrl {

  constructor() {
    this.url = null;
  }

  isUrlValid() {
    return /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(
      this.url
    );
  }

  setUrl(url){
    this.url = url;
  }
}

module.exports = ValidateUrl;