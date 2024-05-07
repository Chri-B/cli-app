const yargs = require("yargs");

const add = require("./cmd/add");
const get = require("./cmd/get");
const rm = require("./cmd/rm");

get(yargs);
add(yargs);
rm(yargs);

yargs.parse();
