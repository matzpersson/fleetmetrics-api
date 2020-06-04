# FleetMetrics Gateway server
FleetMetrics micro services listening to incoming MQTT message from remote devices.:
* Providing MQTT message brokering.
* Provides a Api Gateway for direct metrics delivery and for React SPA interaction.
* Includes a Socket-IO broadcast to listening applications.
* Incoming MTQQ sentence sanitation.

## Technology
* Express NodeJs server
* Mosca Mqtt broker
* Socket-Io broadcasting and listening
* Mongoose MVC (MongoDb)
* Jest and SuperTest testing framework providing model/routes testing with coverage report.
* CI/CD by Gitlab
* Deployment using Kubernetes.
* Development environment using Docker-compose.

## Development environment
This is a hot-loading environment reloading the browser on any change to the code.

* Pull down this repo and change into directory
* Run ```npm install```
* Start up with ```npm start```

## Test Watch and coverage
Package.json is configured for test:watch autoloading tests on any change:
> npm test:watch

Above command does not support test coverage reporting. Use following to see coverage (configured in package.json):
> npm test
