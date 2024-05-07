const fs = require("fs");

function parseClientiJSON() {
  return JSON.parse(fs.readFileSync("clienti.json", "UTF-8"));
}

module.exports = {
  parseClientiJSON,
};
