const express = require('express');
const router = express.Router();

const resumeController = require('../controller/resumeController');






router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

///userApi
router.post('/createResume', resumeController.createResume);

router.get("/parseResume",resumeController.getParseResume)








module.exports = router;