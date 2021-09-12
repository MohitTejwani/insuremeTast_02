var express = require("express");
var router = express.Router();
const { storeMessage } = require('../controller/messageController')

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.post("/", storeMessage);
module.exports = router;
