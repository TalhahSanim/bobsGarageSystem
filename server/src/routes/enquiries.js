// File -> src/routes/enquiries.js
// Routes for enquiries and functiions of each one is in controllers/enquiriesController.js
// POST -> /api/enquries/:serviceId -> private - send an enquiry about a service
// GET -> /api/enquiries/my-enquiries -> private - my enquiries newest first in inbox
// PUT -> /api/enquiries/:enquiryId/read -> private -> tick every enquiry as read
// GET ->  /api/enquiries -> admin which shows enquiry and filters -> ?status=pending
// PUT -> /api/enquiries/enquiryId/reply -> admin -> reply to enquiry

import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import {
  sendEnquiry,
  getMyEnquries,
  tickRead,
  getAllEnquries,
  enquiryResponse,
} from "../controllers/enquiriesController.js";
import { validateEnquiry, validateResponse } from "../utils/validate.js";

const router = express.Router();

router.get("/my-enquiries", auth, getMyEnquries);
router.get("/", auth, admin, getAllEnquries);
router.post("/:serviceId", auth, validateEnquiry, sendEnquiry);
router.put("/:enquiryId/read", auth, tickRead);
router.put("/:enquiryId/reply", auth, admin, validateResponse, enquiryResponse);

export default router;
