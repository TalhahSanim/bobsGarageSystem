//  Only let admins through and it must run after auth as auth sets req.user

// Admin Middleware takes in req,res and next
export default function admin(req, res, next) {
  // Don't log the user out in production as exposes user data
  // console.log(req.user);
  //  401 means NO VALID TOKEN, 403 means valid TOKEN NOT ALLOWED
  if (!req.user.isAdmin) {
    return res.status(403).json({ msg: "Admin Access Only" });
  }
  next();
}
