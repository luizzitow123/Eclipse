import mongoose from 'mongoose';
import logger from '../core/logger'

export default async function (config: any) {
    await mongoose.connect(config.database.mongo.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    logger.info("Connected to the database");
    return true;
}