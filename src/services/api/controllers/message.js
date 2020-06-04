import Message from '../models/message';

exports.index = function (req, res) {
  Message.get(function (err, messages) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "Messages retrieved successfully",
      data: messages
    });
  });
};

// Handle create contact actions
exports.new = function (req, res) {
  var message = new Message();
  message.topic = req.body.topic;
  message.message = req.body.message;

  message.save(function (err) {
    // if (err)
    //     res.json(err);
    res.json({
      message: 'New message created!',
      data: message
    });
  });
};

// Handle findById
exports.view = function (req, res) {
  Message.findById(req.params.id, function (err, message) {
        if (err)
            res.send(err);
        res.json({
            message: 'Success..',
            data: message
        });
    });
};

// Handle updateById
exports.update = function (req, res) {
  Message.findById(req.params.id, function (err, message) {
    if (err) res.send(err);

    message.topic = req.body.topic ? req.body.topic : message.topic;
    message.message = req.body.message;

    message.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'Message updated',
            data: message
        });
    });
  });
};

// Handle remove 
exports.delete = function (req, res) {
  Message.remove({_id: req.params.id}, function (err, message) {
    if (err) res.send(err);
    res.json({
        status: "success",
        message: 'Message deleted'
    });
  });
};
