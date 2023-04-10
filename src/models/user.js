module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        unique: {
            msg: 'Le nom est déjà pris.'
        },
        validate:{
          notEmpty: {msg: 'Veillez saisir un nom'}
        }
      },
      company_id:{
        type: DataTypes.INTEGER,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {msg:'Veillez entrer un mot de passe' }
      }
    },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
            validate: {
              notEmpty: { msg:'Veillez donner un rôle'},
              notNull: {msg:'Le rôle est une propriété requise'}
            }
      }
    })
  }