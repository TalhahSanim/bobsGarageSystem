// File -> server/src/middleware/admin.js
// Author -> Talhah Sanim
// Application Version -> 1.0

//  Only let admins through and it must run after auth as auth sets req.user

/**
 * Allows the request through only if the logged-in user is an admin which always runs after auth
 * @param {object} req - req.user is set by auth
 * @param {object} res - sends 403 if the user isn't an admin
 * @param {Function} next - goes on to the route
 * @returns
 */
export default function admin(req, res, next) {
  // Don't log the user  as it exposes their details in the servers logs
  // console.log(req.user);
  //  401 means NO VALID TOKEN, 403 means valid TOKEN NOT ALLOWED
  if (!req.user.isAdmin) {
    return res.status(403).json({ msg: "Admin Access Only" });
  }
  next();
}
