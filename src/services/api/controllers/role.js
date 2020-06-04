import Role from '../models/role';

// Handle index actions
exports.index = function (req, res) {
  Role.find(req.query, function (err, roles) {
    if (err) {
        res.json({
            status: "error",
            message: err,
        });
    }
    res.json({
        status: "success",
        message: "Roles retrieved successfully",
        data: roles
    });
  });
};

