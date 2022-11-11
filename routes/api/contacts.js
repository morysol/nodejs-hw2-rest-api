const express = require("express");

const controller = require("../../controller/contacts");

const { schemaContact } = require("../../tools/schema");
const { validate } = require("../../tools/validation");

const router = express.Router();

router.get("/", controller.get);
router.get("/:contactId", controller.getById);
router.post("/", validate(schemaContact), controller.add);
router.delete("/:contactId", controller.remove);

router.put("/:contactId", validate(schemaContact), controller.update);

router.patch(
  "/:contactId/favorite",
  validate(schemaContact),

  controller.updateFavorite
);

module.exports = router;
