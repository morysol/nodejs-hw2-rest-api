const express = require("express");
const controller = require("../../controller/users/index");
const auth = require("../../middleware/auth");
const { tryCatchWrapper } = require("../../tools/wrapper");
const { schemaRegister, schemaLogin } = require("../../tools/schema");
const { validate } = require("../../tools/validation");

const router = express.Router();

router.get("/current", auth, tryCatchWrapper(controller.getCurrent));
router.get("/logout", auth, tryCatchWrapper(controller.logout));
router.post("/signup", validate(schemaRegister), controller.register);
router.get("/login", validate(schemaLogin), controller.login);

module.exports = router;
