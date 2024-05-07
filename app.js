const chalk = require("chalk");
const yargs = require("yargs");
const { getClientiByName, addCliente, removeCliente } = require("./app-fn");

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

yargs.parse();
