import Eclipse from './core/Eclipse'

import pt from './languages/pt'
import en from './languages/en'

const client = new Eclipse()

pt(client)
en(client)

client.start()
