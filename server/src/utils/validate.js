// File -> server/src/utils/validate.js
// Author -> Talhah Sanim
// ApplicationVersion -> 1.0

// Server side validation with joi. Each Schema describes what good request body is
// validate schema turns a schema into middleware -> it runs before the route and if the body
// is bad it sends 400 with {msg,errors} and  the route never runs
// the middleware also swaps req.body for Joi's clean copy, trimmed converted unknown fields removed

import Joi from "joi";
// options used for every check
const options = {
  abortEarly: false, // collect each problem  not just first one
  stripUnknown: true, // drop fields the schema doesnt list such as isAdmin on register
  errors: { wrap: { label: false } }, // Name is required and not "Name" is required
  // Friendly messages the users will actually see
  messages: {
    "any.required": "{#label} Is Required",
    "string.empty": "{#label} Is Required",
    "string.email": "{#label} Is Not Valid",
    "string.min": "{#label} Must Be At Least {#limit} Characters",
    "string.max": "{#label} Must Be {#limit} Characters Or Less",
    "number.base": "{#label} Must Be A Number",
    "number.positive": "{#label} Must Be More Than 0",
    "any.only": "{#label} Must Be One Of {#valids}",
  },
};

/**
 * Makes a middleware that checks req.body against a Joi schema
 * @param {object} schema - the Joi schema to check against
 * @returns {Function} middleware -> sends 400 with {msg,errors} listing every issue or clears req.body and calls next
 */
const validate = (schema) => (req, res, next) => {
  // req.body is undefined when no body was sent so check empty object
  const { error, value } = schema.validate(req.body ?? {}, options);

  if (error) {
    // turn joi details array into {field: "message"} -> one message per field
    const errors = {};
    for (const detail of error.details) {
      const field = detail.path[0] ?? "body";
      if (!errors[field]) errors[field] = detail.message;
    }
    // msg -> the first problem so clients can read err.response.data.msg still outputting something useful
    return res.status(400).json({ msg: error.details[0].message, errors });
  }
  // Passed -> route gets the cleaned record
  req.body = value;
  next();
};

// ----------------Schemas----------------------------
// A service -> add (POST) and edit (PUT)
const serviceSchema = Joi.object({
  name: Joi.string().trim().max(100).required().label("Name"),
  type: Joi.string().trim().max(100).required().label("Type"),
  description: Joi.string().trim().max(1000).required().label("Description"),
  // precision(2) rounds to 2 decimal places (5.555 becomes 5.56)
  fee: Joi.number().positive().precision(2).required().label("Fee"),
  // A URL or an /uploads/... path and empty is allowed due to client having fallback image
  image: Joi.string().trim().allow("", null).label("Image"),
});

// A user, added or edited by admin and password is optional
const userSchema = Joi.object({
  firstName: Joi.string().trim().max(50).required().label("First Name"),
  lastName: Joi.string().trim().max(50).required().label("Last Name"),
  email: Joi.string().trim().lowercase().email().required().label("Email"),
  password: Joi.string().min(8).max(72).label("Password"),
  image: Joi.string().trim().allow("", null).label("Image"),
  isAdmin: Joi.boolean().label("Admin"),
});

// ...and required when adding. fork() copies a schema and changes the listed keys
const userAddSchema = userSchema.fork(["password"], (field) =>
  field.required(),
);

// Register -> like user but no isAdmin included as stripUnknown removes it if somebody sends it
const registerSchema = Joi.object({
  firstName: Joi.string().trim().max(50).required().label("First Name"),
  lastName: Joi.string().trim().max(50).required().label("Last Name"),
  email: Joi.string().trim().lowercase().email().required().label("Email"),
  password: Joi.string().min(8).max(72).required().label("Password"),
  image: Joi.string().trim().allow("", null).label("Image"),
});

// Login -> just needs both boxes filled in. No min length here as a wrong password should get usual invalid credential  error no hints on validation rules
const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required().label("Email"),
  password: Joi.string().required().label("Password"),
});

// Preferences -> any of the three but must include one
const preferencesSchema = Joi.object({
  theme: Joi.string().valid("light", "dark").label("Theme"),
  fontSize: Joi.string().valid("small", "medium", "large").label("Font Size"),
  sortOrder: Joi.string()
    .valid("default", "fee-ASC", "fee-DESC", "name-ASC", "name-DESC")
    .label("Sort Order"),
})
  .min(1)
  .messages({ "object.min": "Send At Least One Preference To Change" });

// Enquiries -> customers query and admins reply
const enquirySchema = Joi.object({
  message: Joi.string().trim().min(10).max(1000).required().label("Message"),
});

const replySchema = Joi.object({
  reply: Joi.string().trim().min(1).max(1000).required().label("Reply"),
});

/** Checks a user body and password is required when adding (POST) and optional when editing */
/** Checks a service body (add and edit) */
export const validateService = validate(serviceSchema);

/** Checks a user body and the  password is  required when adding (POST), optional when editing */
export const validateUser = (req, res, next) =>
  validate(req.method === "POST" ? userAddSchema : userSchema)(req, res, next);
/** Checks a register body */
export const validateRegister = validate(registerSchema);
/** Checks a login body */
export const validateLogin = validate(loginSchema);
/** Checks a preferences body */
export const validatePreferences = validate(preferencesSchema);
/** Checks an enquiry message */
export const validateEnquiry = validate(enquirySchema);
/** Checks an admin reply */
export const validateReply = validate(replySchema);
