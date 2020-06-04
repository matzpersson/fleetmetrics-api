const jwt = require("jsonwebtoken");
import Role from './models/role';

module.exports = function(req, res, next) {
  const token = req.headers["x-access-token"] || req.headers["Authorization"];
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.LOGIN_SECRET);
    console.log("DECODED", decoded)
    console.log("METHOD", req.originalUrl, req.method)
    console.log("request", req.route.path)

    // Check for token expiry. 
    // Need to do better. Token should be renewing as app is being used.
    const session_timeout = 3600;
    const expiry = (decoded.iat + session_timeout);
    const now = parseInt(new Date().getTime() / 1000);
    if (expiry < now) {
      res.status(400).send("Token Expired. Please login again.");
      return
    }

    console.log(`Token expiry in ${expiry -now} seconds.`)

    // Check permissions for url for current user role
    Role.findOne({role: decoded.role}, function (err, role) {
      if (role) {
        req.params.permissions = role.permissions;
        const perm = role.permissions.find(permission => permission.url === req.route.path && permission.method === req.method);
        if (perm) {
          console.log("Found Role. All Good", perm);
          next();
          return;
        }
      }

      console.log("Access denied to this section for current user.");
      return res.status(401).send("Access denied to this section for current user.");
    })

  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

