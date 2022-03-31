const app = require("./index");
const connect = require("./configs/db");

app.listen(4600, async function () {
  try {
    await connect();
    console.log("listening on port 4600");
  } catch (err) {
    console.error(err.message);
  }
});