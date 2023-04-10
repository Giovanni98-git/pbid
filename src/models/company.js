module.exports = (sequelize,DataTypes) =>{
    return sequelize.define('Company',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
              validate: {
                notEmpty: { msg:'Veillez écrire le nom de l\'entreprise'},
                notNull: {msg:'L\'entreprise est une propriété requise'}
              }
            },
          adresse: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: { msg:'Veillez saisir une adresse'},
              notNull: {msg:'L\'adresse est une propriété requise'}
            }
          },
          description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: { msg:'Veillez écrire une description'},
              notNull: {msg:'La description est une propriété requise'}
            }
          }
    })
}