require('dotenv').config()

module.exports = {

    // HOST: 'localhost',
    // USER: 'root',
    // PASSWORD: '',
    // DB: 'node_seq_db',
    // dialect: 'mysql',
    // port: 3306,

    HOST: process.env.NODE_ENV === "production" ? process.env.HOST : "localhost",
    USER: process.env.NODE_ENV === "production" ? process.env.USER : "root",
    PASSWORD: process.env.NODE_ENV === "production" ? process.env.PASSWORD : "",
    DB: process.env.DB,
    dialect: process.env.DIALECT,
    PORT: process.env.PORT,

    //optional
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
}