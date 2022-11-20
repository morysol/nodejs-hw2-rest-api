const multer = require("multer");
const path = require("path");
const rootDir = path.dirname(process.argv[1]);
const tempDir = path.join(rootDir, "temp");
const fileSizeLimit = 1024 * 1024 * 5;

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: { fileSize: fileSizeLimit },
});

const upload = multer({ storage: multerConfig });

module.exports = { upload };
