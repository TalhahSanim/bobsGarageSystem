// File -> server/src/routes/testRoute.js
// Author -> Talhah Sanim
// Application Vesion -> 1.0

// Test route -> Get /api confirms API is functional and active

/**
 * Confirms the API is functional and active
 * @route GET /api
 * @access Public
 * @param {object} req - the request which nothing is read from it
 * @param {object} res - sends 200 with a running message
 */
export const apiTest = (req, res) => {
  res.json({ msg: "Bob's Garage API Is Active" });
};
