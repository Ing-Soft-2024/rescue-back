import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../index";

/**
 * 
 * @param {Sequelize} sequelize
 * @param {Sequelize.DataTypes} DataTypes 
 */
const UserAuth = sequelize.define('user_auth', {
    "userId": DataTypes.INTEGER,
    "email": DataTypes.TEXT,
    "passwordHash": DataTypes.TEXT,
    "authType": {
        type: DataTypes.ENUM('credentials', 'google', 'apple'),
        allowNull: false
    },
    "authId": DataTypes.TEXT,
    "token": DataTypes.TEXT,
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',

    tableName: 'user_auth',
});

@ApiModel({
    name: 'UserAuth',
    description: 'User auth model',
})
class UserAuthModel extends Model {
    @ApiModelProperty({
        description: 'login Method',
        required: true,
        example: 'google',
        type: 'string',
    })
    method;

    @ApiModelProperty({
        description: 'credentials',
        required: true,
        example: '"credentials": {"token": "", "email": "example@example.com", "password": "password", "name": "John Doe" }',
        type: 'string',
    })
    credentials;

  
}

/**
 * 
 * @param {*} models 
 */
UserAuth.associate = function (models) {
    UserAuth.belongsTo(models.user, { foreignKey: 'userId' });
}

export default UserAuth;
export { UserAuth };
