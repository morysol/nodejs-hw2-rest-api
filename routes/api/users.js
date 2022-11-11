const express = require("express");
const controller = require("../../controller/users/index"); //
const auth = require("../../middleware/auth");
const { tryCatchWrapper } = require("../../tools/wrapper");

const router = express.Router();

router.get("/current", auth, tryCatchWrapper(controller.getCurrent));
router.get("/logout", auth, tryCatchWrapper(controller.logout));

module.exports = router;
