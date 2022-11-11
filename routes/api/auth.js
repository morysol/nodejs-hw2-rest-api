const express = require("express");
const controller = require("../../controller/auth/index");
const { schemaRegister, schemaLogin } = require("../../tools/schema");
const { validate } = require("../../tools/validation");

const router = express.Router();

router.post("/signup", validate(schemaRegister), controller.register);
router.get("/login", validate(schemaLogin), controller.login);

module.exports = router;
