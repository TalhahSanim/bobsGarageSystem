// File -> src/controller/preferencesController.js
// The logged in users display preferences -> get them and change them
//  routes/preferences.js puts auth in front of both

import db from "../models/models.js";

const { Preference } = db.sequelize.models;

// name -> Get my preferences
// path -> /api/preferences
// request -> GET
// type -> private
// Description -> gets the logged in user's preferences and if they dont have row yet
// one is created with default values such as light theme and medium font
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

// name -> update my preferences
// path -> /api/preferences
// request -> PUT
// type -> private
// description -> Changes theme, font size and or sort order and only fields sent get changed/updated
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
    // A SequelizeValidationError means a value wasnt allowed
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({ msg: "Invalid Preference Value" });
    }
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};
