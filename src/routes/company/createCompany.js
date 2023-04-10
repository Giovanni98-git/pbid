const { UniqueConstraintError, ValidationError} = require('sequelize')
const { Company } = require('../../db/sequelize')
const {authentadmin} = require('../../db/auth')

module.exports = (app) =>{
    app.post('/api/createCompany', authentadmin, (req, res) =>{
        Company.create(req.body)
        .then(company =>{
            const message = `L'entreprise ${req.body.name} a bien été créé. `
            res.json({ message, data: company })
        })
        .catch( error =>{
            if(error instanceof ValidationError){
                return res.status(400).json({ message: error.message, data: error})
              }
              if( error instanceof UniqueConstraintError){
                return res.status(400).json({message: error.message, data: error})
              }
              const message = "L'entreprise n'a pas été ajouté. Réessayez dans quelques instants."
              res.status(500).json({ message, data: error})
        })
    })
}