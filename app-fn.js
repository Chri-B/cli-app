const fs = require("fs");

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

function addCliente({ name, email, phone }) {
  const clienti = parseClientiJSON();
  const new_cliente = { name, email, phone };

  clienti.push(new_cliente);

  fs.writeFileSync("clienti.json", JSON.stringify(clienti));

  return true;
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

function parseClientiJSON() {
  return JSON.parse(fs.readFileSync("clienti.json", "UTF-8"));
}

module.exports = {
  getClientiByName,
  addCliente,
  removeCliente,
};
