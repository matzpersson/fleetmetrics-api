import Asset from '../models/asset';

// Handle index actions
exports.index = function (req, res) {
  Asset.find(req.query, function (err, assets) {
    if (err) {
        res.json({
            status: "error",
            message: err,
        });
    }
    res.json({
        status: "success",
        message: "Assets retrieved successfully",
        data: assets
    });
  });
};

// Handle create actions
exports.new = function (req, res) {
  var asset = new Asset();
  asset.key = req.body.key ? req.body.key : asset.key;
  asset.name = req.body.name;
  asset.models = req.body.models;
  asset.gauges = req.body.gauges;
  asset.sentenceType = req.body.sentenceType;

  asset.save(function (err) {
    // if (err)
    //     res.json(err);
    res.json({
        message: 'New asset created!',
        data: asset
    });
  });
};

// Handle findById
exports.view = function (req, res) {
  console.log("asset id". req)
  Asset.findById(req.params.id, function (err, asset) {
    if (err)
      res.send(err);
    res.json({
      message: 'Success..',
      data: asset
    });
  });
};

// Handle updateById
exports.update = function (req, res) {
  Asset.findById(req.params.id, function (err, asset) {
    if (err) res.send(err);
    asset.key = req.body.key ? req.body.key : asset.key;
    asset.name = req.body.name ? req.body.name : asset.name;
    asset.models = req.body.models ? req.body.models : asset.models;
    asset.gauges = req.body.gauges ? req.body.gauges : asset.gauges;
    asset.sentenceType = req.body.sentenceType ? req.body.sentenceType : asset.sentenceType;

    asset.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'Asset updated',
            data: asset
        });
    });
  });
};

// Handle remove 
exports.delete = function (req, res) {
  Asset.remove({_id: req.params.id}, function (err, asset) {
    if (err) res.send(err);
    res.json({
        status: "success",
        message: 'Asset deleted'
    });
  });
};
