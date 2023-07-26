const dbConfig = require('../config/dbConfig')
const mysql = require('mysql2');
const { Sequelize, DataTypes } = require('sequelize')

//create a Sequelize instance to connect to database 
var connection = mysql.createConnection({
  host: dbConfig.HOST,
  port: dbConfig.port,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
});
connection.connect(function (err) {
  if (err) throw err;
  console.log(`${dbConfig.dialect} Connected!`);
    console.log(process.env.DIALECT)
    console.log(`${process.env.PORT} Connected!`);
  // console.log(dbConfig.DB)
  connection.query("CREATE DATABASE IF NOT EXISTS " + dbConfig.DB, function (err, result) {
    // console.log(result)
    if (err) throw err;
    console.log(`${dbConfig.DB} Database created`);
  });
});

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = require('./productModel.js')(sequelize, DataTypes)
db.reviews = require('./reviewModel.js')(sequelize, DataTypes)
db.categories = require('./categoryModel.js')(sequelize, DataTypes)

//impt force = false, to prevent existing table to be truncated and only new tables will be create, true will truncate existing tables
db.sequelize.sync(
  {
    force: false,
    alter: true
  })
  .then(() => {
    console.log('Sequelize re-sync done.')
  }).catch((err) => {
    console.log(err)
  })

//models relations
// db.categories.hasMany(db.products)
// db.products.belongsTo(db.categories)
db.categories.hasMany(db.products, {
  foreignKey: {
    name: 'category_id',
    allowNull: false
  },
  onDelete: 'CASCADE',
  // onUpdate: 'CASCADE',
})
db.products.belongsTo(db.categories, {
  foreignKey: {
    name: 'category_id',
    allowNull: false,
    isInt: true
  },
  onDelete: 'CASCADE',
  // onUpdate: 'CASCADE',
})

// 1 to many relation
db.products.hasMany(db.reviews, {
  foreignKey: {
    name: 'product_id',
    allowNull: false
  },
  onDelete: 'CASCADE',
  // onUpdate: 'CASCADE',
})
db.reviews.belongsTo(db.products, {
  foreignKey: {
    name: 'product_id',
    allowNull: false,
    isInt: true
  },
  onDelete: 'CASCADE',
  // onUpdate: 'CASCADE',
})

module.exports = db