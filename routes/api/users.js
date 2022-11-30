const express = require("express");
const controller = require("../../controller/users");
const auth = require("../../middleware/auth");
const emailVerify = require("../../middleware/emailVerify");
const { tryCatchWrapper } = require("../../tools/wrapper");
const { schemaRegister, schemaLogin } = require("../../tools/schema");
const { validate } = require("../../tools/validation");

const { upload } = require("../../middleware/upload");

const router = express.Router();

router.get("/current", auth, tryCatchWrapper(controller.getCurrent));
router.get("/logout", auth, tryCatchWrapper(controller.logout));
router.post("/signup", validate(schemaRegister), controller.register);
router.get("/login", validate(schemaLogin), controller.login);
//
router.patch("/avatar", auth, upload.single("image"), controller.patchAvatar);
//
router.get("/verify/:verificationToken", controller.verifyEmail);
router.post("/verify", emailVerify, controller.verifyAgain);

module.exports = router;
