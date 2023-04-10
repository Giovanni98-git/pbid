module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Job_Sector', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      job_sector_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg:'Veillez renseigner le nom du secteur de l\'emploi'},
          notNull: {msg:'Le nom du seteur est une propriété requise'}
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
            validate: {
              notEmpty: { msg:'Veillez écrire une description'},
              notNull: {msg:'La description est une propriété requise'}
            }
      },
    })
  }