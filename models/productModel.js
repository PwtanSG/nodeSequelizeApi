// const { DataTypes } = require("sequelize")
// const { sequelize } = require(".")

module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define('product', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1 - auto generate by Sequelize
            allowNull: false,
            validate: {
                isUUID: 4,
                notEmpty: true
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: true,
                isNumeric: true,
                min: 0,
            }
        },
        descriptions: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        image: {
            type: DataTypes.STRING
        },
        published: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    })

    return Product

}, { timestamps: true };
