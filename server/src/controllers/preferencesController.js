// File -> server/src/controllers/preferencesController.js
// Author -> Talhah Sanim
// Application Version -> 1.0

// The logged in users display preferences -> get them and change them
//  routes/preferences.js puts auth in front of both

import db from "../models/models.js";

const { Preference } = db.sequelize.models;

/**
 * Gets the logged-in user's preferences and creating defaults upon first time login
 * @route GET /api/preferences
 * @access Logged In
 * @param {object} req - req.user is set by auth
 * @param {object} res - sends 200 with {theme,fontSize,sortOrder} or 500 on a server error
 */
export const getPreferences = async (req, res) => {
  console.log("/api/preferences -> GET");
  try {
    const [preferences] = await Preference.findOrCreate({
      where: { userId: req.user.userId },
    });
    res.status(200).json(preferences);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};
/**
 * Saves only the preferences that were sent
 * @route PUT /api/preferences
 * @access Logged In
 * @param {object} req - req.user is et by auth and req.body may have theme, fontSize and sortOrder
 * @param {object} res - sends 200 with the saved preferences and 400 if value isn't allowed or 500
 */
export const updatePreferences = async (req, res) => {
  console.log("/api/preferences -> PUT");
  // Only carry over the fields we allow and ignore anything different in body
  const updates = {};
  if (req.body.theme) updates.theme = req.body.theme;
  if (req.body.fontSize) updates.fontSize = req.body.fontSize;
  if (req.body.sortOrder) updates.sortOrder = req.body.sortOrder;

  try {
    const [preferences] = await Preference.findOrCreate({
      where: { userId: req.user.userId },
    });
    // update( )on row runs the model's validate rules (isIn)
    await preferences.update(updates);
    res.status(200).json(preferences);
  } catch (err) {
    // A SequelizeValidationError means a value wasn't allowed
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({ msg: "Invalid Preference Value" });
    }
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};
