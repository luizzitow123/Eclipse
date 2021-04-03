import Eclipse from './core/Eclipse'
import config from '../config/config.json'
import pt from './languages/pt'
import en from './languages/en'
import dotenv from 'dotenv';
dotenv.config()

const client = new Eclipse(config)

pt(client)
en(client)

client.start()