
import 'dotenv/config';
import Message from '../api/models/message';
import Sanitiser from '../sanitiser';
import mosca from 'mosca';
const { StringDecoder } = require('string_decoder');

class Broker {
  constructor(io) {
    // Set Socket-IO
    this.io = io
  }

  start() {
    // MQTT incoming
    var mqttSettings = {
      port: parseInt(process.env.MQTT_PORT)
    }

    var server = new mosca.Server(mqttSettings);
    server.on('ready', function(){
      console.log(`MQTT broker ready on port ${process.env.MQTT_PORT}`);
    });

    const io = this.io

    // fired when a message is received
    server.on('published', function(packet, client) {
      const decoder = new StringDecoder('utf8');
      const response = decoder.write(packet.payload);

      // console.log('Published', packet.topic, "Response is:", response);

      // Write raw stream to Mongo
      // console.log("TOOPIC",packet.topic)
      if (packet.topic.indexOf('$SYS') !== -1) {
        return null
      }

      var message = new Message();
      message.topic = packet.topic;
      message.message = response;
      message.save();

      // Prettify stream and write to Mongo metrics collection
      var sanitiser = new Sanitiser()
      const metric = sanitiser.save(packet.topic, response);

      // Broadcast to listening socket-io clients
      io.send(packet.topic, metric)
    })

    // fired when a client connects
    server.on('clientConnected', function(client) {
      console.log('Client Connected:', client.id);
    });

    // fired when a client disconnects
    server.on('clientDisconnected', function(client) {
      console.log('Client Disconnected:', client.id);
    });
  }
}

export default Broker;
