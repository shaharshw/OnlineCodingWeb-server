const express = require("express");
const router = express.Router();
const {getCodeBlocks, updateCode} = require("../controllers/codeBlockController");


router.route("/").get(getCodeBlocks);
router.route("/").post(updateCode);

module.exports = router;

