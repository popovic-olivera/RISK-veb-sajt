const express = require("express");
const meetingController = require("./meetingController");

const router = express.Router();
router.get("/", meetingController.getMeetings);
router.get("/:id", meetingController.getMeetingById);
router.post("/", meetingController.createMeeting);
router.put("/:id", meetingController.updateMeeting);
router.delete("/:id", meetingController.deleteMeeting);

module.exports = router;
