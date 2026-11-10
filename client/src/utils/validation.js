// File -> client/src/utils/validation.js
// Author -> Talhah Sanim
// Application Version -> 1.0

// This file holds our client-side validation

// Function: is_Empty
// Param: value. The input we wish to check
// This function will check passed value: undefined, null, an empty string
// return true if any test is true but false otherwise
export const is_Empty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

// create a function to check if a string contains any special characters.
// this function will use a regular expression to test a value.
// Return true if there are special characters
// return false if there is only a-z or A-Z characters
export const alpha = (value) => {
  let ex = /[^a-zA-Z]+$/;
  const result = ex.test(value);
  return result;
};

// Use a regular expression to test that we have a number with only 2 decimal places
// param : the value we wish to test
// Return true if it matches digits with 1 or 2 decimal places
export const isValidFee = (value) => {
  let ex = /^\d+(\.\d{1,2}?$)/;
  const result = ex.test(value);
  return result;
};
