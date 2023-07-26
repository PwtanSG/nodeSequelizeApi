module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define('category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true,  
                notEmpty: true
            }
        },
        descriptions: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    });

    return Category
}