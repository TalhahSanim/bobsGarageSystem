// Server side validation -> Each function cheeck req.body prior to route saves it
// when something goes wrong it sends 404 bad request through errors object and makes sure route doesnt run

// is value missing or includes spacing
const isEmpty = (value) =>
  value === undefined || value === null || String(value).trim() === "";

// The fee -> Digits then optionally a dot and 1 to 2 digits such as
// 12,3.9. 9.90 and "abc" Fail
const isFee = (value) => /^\d+(\.\d{1,2})?$/.test(String(value));

// Simple email strucuture such as email@email.com
const isEmail = (value) => /^[^\s@]+@[^\s@]+$/.test(String(value));

// send 400 if errors object containe anything but otherwise run th erout
const handleErrors = (errors, res, next) => {
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};

// Check service before add (POST) & edit (PUT)
export function validateService(req, res, next) {
  const { name, type, description, fee } = req.body;
  const errors = {};

  if (isEmpty(name)) errors.name = "Name is required";
  if (isEmpty(type)) errors.type = "Type is required";
  if (isEmpty(description)) errors.description = "Description is required";
  if (isEmpty(fee)) errors.fee = "Fee is required";
  else if (!isFee(fee))
    errors.fee = "Fee must be a number up to 2 decimal places";

  handleErrors(errors, res, next);
}

// Check user before admin adds post or edits puts one
export function validateUser(req, res, next) {
  const { firstName, lastName, email, password } = req.body;
  const errors = {};
  if (isEmpty(firstName)) errors.firstName = "First Name is required";
  if (isEmpty(lastName)) errors.lastName = "Last Name is required";
  if (isEmpty(email)) errors.email = "Email is required";
  else if (!isEmail(email)) errors.email = "Email not valid";

  // check user needs a password and to note that edit from does not send on so only check when its there

  if (req.method === "POST" && isEmpty(password)) {
    errors.password = "Password is required";
  } else if (!isEmpty(password) && String(password).length < 8) {
    errors.password = "Password must be at least 8 characters";
  }
  handleErrors(errors, res, next);
}
