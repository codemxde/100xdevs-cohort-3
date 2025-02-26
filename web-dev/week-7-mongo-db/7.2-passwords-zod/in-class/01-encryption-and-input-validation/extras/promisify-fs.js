// a different/promisided version of fs has to imported!
const fs = require("fs/promises");

fs.readFile("db.js", "utf-8")
  .then((data) => {
    console.log("File\n", data);
  })
  .catch((err) => {
    console.log("error reading file");
  });

(async function promisifiedRead() {
  try {
    const data = await fs.readFile("errors.js", "utf-8");
    console.log("File Read:\n" + data);
  } catch (e) {
    console.log("error reading file " + e.message);
  }
})();
