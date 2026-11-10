// File -> server/src/controllers/enquiriesController.js
// Author -> Talhah Sanim
// Application Version -> 1.0

// Enquiries controllers -> is a customers question/query about a service and business's response
// send, get my-enquiries,mark-read, get all (admin) and reply (admin)
// routes/enquiries.js makes auth and admin in front of each route

import db from "../models/models.js";

const { Enquiry, Service, User } = db.sequelize.models;

// Key customer files and admin will utilise which is never password for security reasons
const customer = ["userId", "firstName", "lastName", "email"];

// name -> send enquiry
// path -> api/enquiries/:serviceId
// request -> POST
// type -> private
// description -> saves the logged in users question about service

export const sendEnquiry = async (req, res) => {
  console.log("/api/enquiries/:serviceId -> POST");
  // URL params are strings but serviceId is a number and it will be typecasted
  const serviceId = Number(req.params.serviceId);
  //   trim() removes spacing at start and ends and makes " " as empty
  const message = (req.body.message || "").trim();

  try {
    // Ensure service exists?
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ msg: "Service Not Found" });
    }
    // User comes via the token not from body
    const enquiry = await Enquiry.create({
      userId: req.user.userId,
      serviceId,
      message,
    });

    // send whole enquiry  back with service details which makes it inbox ready
    const wholeEnquiry = await Enquiry.findByPk(enquiry.enquiryId, {
      include: [{ model: Service }],
    });
    res.status(201).json({
      msg: `Thanks For Your Enquiry ${req.user.firstName}! We Will Reply About Details Of This ${service.name} Service In Your Inbox.`,
      enquiry: wholeEnquiry,
    });
  } catch (err) {
    // failed validation -> over 1000 characters  gets 400 error
    if (err.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ msg: "Your Message Must Be Between 10 and 1000 Characters" });
    }
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

//  name -> get my enquiries
// path -> /api/enquiries/my-enquiries
// request -> GET
// type -> private
// description -> the logged in users enquiries with each service sorted by newest entries first
export const getMyEnquiries = async (req, res) => {
  console.log("/api/enquiries/my-enquiries -> GET");
  try {
    const list = await Enquiry.findAll({
      where: { userId: req.user.userId },
      include: [
        {
          model: Service,
          attributes: [
            "serviceId",
            "name",
            "type",
            "description",
            "image",
            "fee",
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

// name -> Tick a reply as read
// path /api/enquiries/:enquiryId/read
// request -> PUT
// type -> private
// description -> the user has seen the business's response and only applies to user's own enquiries
export const tickRead = async (req, res) => {
  console.log("/api/enquiries/:enquiryId/read -> PUT");
  const enquiryId = Number(req.params.enquiryId);
  try {
    //  userId in the where clause as you can only tick own enquiries
    const [count] = await Enquiry.update(
      { readByUser: true },
      { where: { enquiryId, userId: req.user.userId } },
    );

    if (!count) {
      return res.status(404).json({ msg: "Enquiry Not Found" });
    }
    res.status(200).json({ enquiryId, readByUser: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

// name -> Get All Enquiries
// path -> /api/enquiries
// request -> GET
// type -> admin
// description -> every enquiry with customer and service sorted newest first

export const getAllEnquiries = async (req, res) => {
  console.log("/api/enquiries -> GET");
  // filter query  based on enquiry query status

  const where = {};
  if (["pending", "responded"].includes(req.query.status)) {
    where.status = req.query.status;
  }
  try {
    const list = await Enquiry.findAll({
      where,
      include: [
        { model: User, attributes: customer },
        { model: Service, attributes: ["serviceId", "name"] },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

// name -> reply to enquiry
// path -> /api/enquiries/:enquiryId//reply
// request -> PUT
// type -> admin
// description -> saves the businesses response and stick if responded and make it unread for the customer

export const enquiryResponse = async (req, res) => {
  console.log("/api/enquiries/:enquiryId/reply -> PUT");
  const enquiryId = Number(req.params.enquiryId);
  const reply = (req.body.reply || "").trim();

  try {
    const enquiry = await Enquiry.findByPk(enquiryId);
    if (!enquiry) {
      return res.status(404).json({ msg: "Enquiry Not Found" });
    }
    // update on rows run models validation rules
    await enquiry.update({
      response: reply,
      status: "responded",
      repliedAt: new Date(),
      readByUser: false,
    });

    // Send back with customer and service details for admin page
    const wholeEnquiry = await Enquiry.findByPk(enquiryId, {
      include: [
        { model: User, attributes: customer },
        { model: Service, attributes: ["serviceId", "name"] },
      ],
    });
    res.status(200).json(wholeEnquiry);
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ msg: "Reply Must Be 1000 Characters Or Less" });
    }
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};
