const fs = require("fs");
const { parseClientiJSON } = require("../utils");
const chalk = require("chalk");

function rm(yargs) {
  // node app.js rm --name='Jim'
  yargs.command({
    command: "rm",
    describe: "remove the first occurrence of the client's list filtered by name",
    builder: {
      name: {
        describe: "Client's name",
        demandOption: true,
        type: yargs.string,
      },
    },
    handler(argv) {
      const res = removeCliente(argv.name);
      if (res.status) {
        console.log(chalk.green.bold("Done!"));
        console.log(chalk.red.bold(JSON.stringify(res.removed)));
        res.clients.forEach((element) => {
          console.log(chalk.green.bold(JSON.stringify(element)));
        });
      } else {
        console.log(chalk.red.bold(res.error ?? "An error has occurred!"));
      }
    },
  });
}

function removeCliente(search_name) {
  const clienti = parseClientiJSON();
  const res = { status: false, error: "", clients: [], removed: null };

  let idx = clienti.findIndex((x) => x.name.toLowerCase() === search_name.toLowerCase());
  if (idx >= 0) {
    const removed = clienti[idx];
    clienti.splice(idx, 1);
    fs.writeFileSync("clienti.json", JSON.stringify(clienti));
    res.status = true;
    res.clients = clienti;
    res.removed = removed;
    return res;
  }

  res.error = "Client not found";
  return res;
}

module.exports = rm;
