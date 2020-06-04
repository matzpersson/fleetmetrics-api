class Inmwv {
  constructor() {
    this.fields = [
      "angle",
      "reference",
      "speed",
      "units",
      "status",
      "checksum"
    ]
  }

  create(elements) {
    const fields = this.fields;

    let sentenceSchema = {};
    elements.slice(2).forEach(function(element, index) {
      sentenceSchema[fields[index]] = element;
    })

    sentenceSchema.speed = parseInt(sentenceSchema.speed);

    delete sentenceSchema.checksum;
    delete sentenceSchema.status;

    return sentenceSchema;
  }
}

export default Inmwv;
