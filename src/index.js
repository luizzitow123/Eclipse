const Eclipse = require('./core/Eclipse');

const config = require("../config/config.json");
const client = new Eclipse(config);

client.lang = {}
require("./languages/en")(client)
require("./languages/pt")(client)

client.start()