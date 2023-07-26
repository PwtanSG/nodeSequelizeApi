module.exports = (sequelize, DataTypes) => {

    const Review = sequelize.define('review', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1 - auto generate by Sequelize
            allowNull: false,
            validate: {
                notEmpty: true,
                isUUID: 4
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
                isInt: true,
                min: 1,
                max: 10
            }
        },
        descriptions: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        remarks: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        // product_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     validate: {
        //         notEmpty: true,
        //         isInt: true,
        //         min: 1
        //     }
        // }
    })

    return Review

}
