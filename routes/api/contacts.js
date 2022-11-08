const express = require("express");

const controller = require("../../controller");

const { schemaContact } = require("../../tools/schema");
const { validateContact } = require("../../tools/validation");

const router = express.Router();

router.get("/", controller.get);
router.get("/:contactId", controller.getById);
router.post("/", validateContact(schemaContact), controller.add);
router.delete("/:contactId", controller.remove);

router.put("/:contactId", validateContact(schemaContact), controller.update);

router.patch(
  "/:contactId/favorite",
  validateContact(schemaContact),

  controller.updateFavorite
);

module.exports = router;
