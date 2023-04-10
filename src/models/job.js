module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Job', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      company_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt : { msg: 'Utilisez uniquement des nombres entiers pour des points de vie.'},
          min: {
            args: [1],
            msg: 'L\'id doit être supérieur ou égale à 1.'
           }
          }
      },
      sector_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt : { msg: 'Utilisez uniquement des nombres entiers.'},
          min: {
            args: [1],
            msg: 'L\'id du secteur doit être supérieur ou égale à 1.'
           }
          }
      },
      job_name: {
        type: DataTypes.STRING,
        allowNull: false,
            validate: {
              notEmpty: { msg:'Veillez écrire le nom de l\'emploi'},
              notNull: {msg:'L\'emploi est une propriété requise'}
            }
      },
      contrat_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg:'Veillez indiquer le type de contrat'},
          notNull: {msg:'Le type de contrat est une propriété requise'}
        }
      },
      other_remuneration: {
        type: DataTypes.STRING,
        allowNull: false,
            validate: {
              notEmpty: { msg:'Veillez écrire la rémunération'},
              notNull: {msg:'La rémunération est une propriété requise'}
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
    },{
      timestamps: true,
      createdAt: 'publication_date',
      updatedAt: false
    })
  }