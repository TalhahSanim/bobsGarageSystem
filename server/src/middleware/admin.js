//  Only let admins through and it must run after auth as auth sets req.user

// Admin Middleware takes in req,res and next
export default function admin(req, res, next) {
  console.log(req.user);
  //  401 means NO VALID TOKEN, 403 means valid TOKEN NOT ALLOWED
  if (!req.user.isAdmin) {
    return res.status(403).json({ msg: "Access DENIED" });
  }
  next();
}
