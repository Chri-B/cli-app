const chalk = require("chalk");
const { parseClientiJSON } = require("../utils");

function get(yargs) {
  // node app.js get --name='Jim'
  yargs.command({
    command: "get",
    describe: "search a client by name",
    builder: {
      name: {
        describe: "Client's name",
        demandOption: true,
        type: yargs.string,
      },
    },
    handler(argv) {
      const res = getClientiByName(argv.name);
      if (!res.status) {
        console.log(chalk.red.bold("Maybe you were looking for \n"));
        console.log(res.suggestions);
        return;
      }

      res.clients.forEach((element) => {
        console.log(chalk.green.bold(JSON.stringify(element)));
      });
    },
  });
}

function getClientiByName(search_name) {
  const clienti = parseClientiJSON();

  (res = { status: false, suggestions: "", clients: [] }), (clienti_filter = clienti.filter((x) => x.name.toLowerCase() === search_name.toLowerCase()));
  if (!clienti_filter || !clienti_filter.length) {
    clienti.map((clienteItem) => {
      if (clienteItem.name.toLowerCase().startsWith(search_name.toLowerCase().charAt(0))) {
        res.suggestions == "" ? (res.suggestions += `${clienteItem.name}`) : (res.suggestions += `, ${clienteItem.name}`);
      }
    });
  } else {
    res.status = true;
    res.clients = clienti_filter;
  }
  return res;
}

module.exports = get;
