require('dotenv').config();

exports.getDatabase = async (dbName = "secondDB") => {
    const dbConn = await global.mongoConnection;
    const db = dbConn.useDb(dbName);
    return db;
}
