module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comments', {
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        commenterId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
}
