import Metric from '../models/metric';

exports.index = function (req, res) {
  Metric.find(req.query, function (err, metrics) {
    if (err) {
      res.json({
        status: "error",
        metric: err,
      });
    }
    res.json({
      status: "success",
      metric: "Metrics retrieved successfully",
      data: metrics
    });
  });
};

exports.modelrange = function (req, res) {
  const topic = req.query.topic;
  const model = req.query.model;
  const fromDate = new Date(req.query.from);
  const toDate = new Date(req.query.to);

  const query = {
    topic: topic,
    sentenceModel: model,
    recorded: {
      $gt: fromDate,
      $lt: toDate
    }
  }
  console.log("QUERY", query)
  Metric.find(query, function (err, metrics) {
    if (err) {
      res.json({
        status: "error",
        metric: err,
      });
    }
    res.json({
      status: "success",
      metric: "Metrics retrieved successfully",
      data: metrics
    });
  });
};

// Handle create contact actions
exports.new = function (req, res) {
  var metric = new Metric();
  metric.topic = req.body.topic;
  metric.metric = req.body.metric;

  metric.save(function (err) {
    // if (err)
    //     res.json(err);
    res.json({
      metric: 'New metric created!',
      data: metric
    });
  });
};

// Handle findById
exports.view = function (req, res) {
  Metric.findById(req.params.id, function (err, metric) {
      if (err)
          res.send(err);
      res.json({
          metric: 'Success..',
          data: metric
      });
  });
};

// Handle updateById
exports.update = function (req, res) {
  Metric.findById(req.params.id, function (err, metric) {
    if (err) res.send(err);

    metric.topic = req.body.topic ? req.body.topic : metric.topic;
    metric.metric = req.body.metric;

    metric.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            metric: 'Metric updated',
            data: metric
        });
    });
  });
};

// Handle remove 
// exports.delete = function (req, res) {
//   Metric.remove({_id: req.params.id}, function (err, metric) {
//     if (err) res.send(err);
//     res.json({
//         status: "success",
//         metric: 'Metric deleted'
//     });
//   });
// };
