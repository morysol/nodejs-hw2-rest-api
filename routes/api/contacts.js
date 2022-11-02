const express = require("express");

const controller = require("../../controller");

const { schemaContact, schemaStatus } = require("../../tools/schema");
const { validateContact, validateStatus } = require("../../tools/validation");

const router = express.Router();

router.get("/", controller.get);
router.get("/:contactId", controller.getById);
router.post("/", validateContact(schemaContact), controller.add);
router.delete("/:contactId", controller.remove);

router.put("/:contactId", validateContact(schemaContact), controller.update);

router.patch(
  "/:contactId/favorite",
  validateStatus(schemaStatus),

  controller.updateFavorite
);

module.exports = router;
