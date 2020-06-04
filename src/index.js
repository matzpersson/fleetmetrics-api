import 'dotenv/config';
import mongoose from 'mongoose';
import Broker from './services/broker';
import IO from './services/io';

// Mongoose and Mongodb connection
const mongo_server = process.env.MONGO_SERVER || 'localhost';
const mongo_db = process.env.MONGO_DATABASE || 'fleetmetrics';
const mongo_port = process.env.MONGO_PORT || 27017;

mongoose.connect(`mongodb://${mongo_server}/${mongo_db}`, { useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

// Check Mongo connection
if(!db)
    console.log("Error connecting Mongo. Have you started Mongo server?");
else
    console.log(`MongoDb ready on ${mongo_server}:${mongo_port}/${mongo_db}`);

// Start Api
const app = require('./services/api');
const port = process.env.API_PORT || 8080;
app.listen(port, function () {
  console.log("REST Api ready on port " + port);
});

// Configure Socket-IO
const io = new IO(app);
io.start();

// Start the MQTT Broker
const broker = new Broker(io);
broker.start();
