"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Eclipse_1 = __importDefault(require("./core/Eclipse"));
const config_json_1 = __importDefault(require("../config/config.json"));
const pt_1 = __importDefault(require("./languages/pt"));
const en_1 = __importDefault(require("./languages/en"));
const client = new Eclipse_1.default(config_json_1.default);
pt_1.default(client);
en_1.default(client);
client.start();
