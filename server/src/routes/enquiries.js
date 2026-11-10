// File -> server/src/routes/enquiries.js
// Author -> Talhah Sanim
// Application Version -> 1.0

// Routes for enquiries and functions of each one is in controllers/enquiriesController.js
// POST -> /api/enquiries/:serviceId -> private - send an enquiry about a service
// GET -> /api/enquiries/my-enquiries -> private - my enquiries newest first in inbox
// PUT -> /api/enquiries/:enquiryId/read -> private -> tick every enquiry as read
// GET ->  /api/enquiries -> admin which shows enquiry and filters -> ?status=pending
// PUT -> /api/enquiries/enquiryId/reply -> admin -> reply to enquiry

import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import {
  sendEnquiry,
  getMyEnquiries,
  tickRead,
  getAllEnquiries,
  enquiryResponse,
} from "../controllers/enquiriesController.js";
import { validateEnquiry, validateReply } from "../utils/validate.js";

const router = express.Router();

router.get("/my-enquiries", auth, getMyEnquiries);
router.get("/", auth, admin, getAllEnquiries);
router.post("/:serviceId", auth, validateEnquiry, sendEnquiry);
router.put("/:enquiryId/read", auth, tickRead);
router.put("/:enquiryId/reply", auth, admin, validateReply, enquiryResponse);

export default router;
