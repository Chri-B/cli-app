const chalk = require("chalk");
const { parseClientiJSON } = require("../utils");
const fs = require("fs");

function add(yargs) {
  // node app.js add --name='Jim' --email='jim@office.com' --phone='12345678'
  yargs.command({
    command: "add",
    describe: "add a new client",
    builder: {
      name: {
        describe: "Client's name",
        demandOption: true,
        type: yargs.string,
      },
      email: {
        describe: "Client's email",
        demandOption: true,
        type: yargs.string,
      },
      phone: {
        describe: "Client's phone",
        demandOption: true,
        type: yargs.string,
      },
    },
    handler(argv) {
      addCliente(argv);
      console.log(chalk.green.bold("Done!"));
    },
  });
}

function addCliente({ name, email, phone }) {
  const clienti = parseClientiJSON();
  const new_cliente = { name, email, phone };

  clienti.push(new_cliente);

  fs.writeFileSync("clienti.json", JSON.stringify(clienti));

  return true;
}

module.exports = add;
