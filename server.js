require("dotenv").config();

const { app, connection } = require("./app");
const PORT = process.env.PORT || 3000;

connection()
  .then(() => {
    app.listen(PORT, async function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
      console.log("Database connection successful");
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
