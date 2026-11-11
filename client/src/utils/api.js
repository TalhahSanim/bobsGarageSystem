/**
 * File: client/src/utils/api.js
 * Author: Talhah Sanim
 * Purpose: The server's address in one place. Render sets VITE_API_URL at build time;
 *          locally it falls back to the dev server on port 3000.
 * Version: 1.0
 */

// The server itself, e.g. https://bobs-garage-api.onrender.com (used for /uploads images)
export const SERVER_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

// The API, e.g. https://bobs-garage-api.onrender.com/api
export const API_URL = `${SERVER_URL}/api`;
