import mongoose from 'mongoose';
import logger from '../core/logger'

class Mongo {
    constructor(config: any) {
        mongoose.connect(config.database.mongo.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        logger.info("Connected to the database");
        return true;
    }
}
export default Mongo;