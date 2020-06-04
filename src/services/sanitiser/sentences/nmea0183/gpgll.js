class Gpgll {
  constructor() {
    this.fields = [
      "lat",
      "latCardinal",
      "lon",
      "lonCardinal",
      "timestamp",
      "faamode",
      "checksum"
    ]
  }

  create(elements) {
    const fields = this.fields;

    let sentenceSchema = {};
    elements.slice(2).forEach(function(element, index) {
      sentenceSchema[fields[index]] = element;
    })

    sentenceSchema.lat = this.convertCoordinate(sentenceSchema.lat, sentenceSchema.latCardinal);
    sentenceSchema.lon = this.convertCoordinate(sentenceSchema.lon, sentenceSchema.lonCardinal);

    delete sentenceSchema.checksum;
    delete sentenceSchema.faamode;
    delete sentenceSchema.timestamp;

    return sentenceSchema;
  }

  convertCoordinate(coord, cardinal) {
    const dotPos = coord.indexOf('.');

    const degrees = parseInt(coord.substring(0, dotPos - 2));
    const minutes = parseFloat((coord.substring(dotPos - 2)) / 60);

    let newCoord = degrees + minutes;
    if (cardinal === 'S' || cardinal === 'W') {
      newCoord = -newCoord;
    }
    return newCoord;
  }
}

export default Gpgll;
