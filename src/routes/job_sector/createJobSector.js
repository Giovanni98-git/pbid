const { UniqueConstraintError, ValidationError} = require('sequelize')
const { JobSector } = require('../../db/sequelize')
const {authentadminuser} = require('../../db/auth')

module.exports = (app) =>{
    app.post('/api/createJobSector',authentadminuser, (req, res) =>{
        JobSector.create(req.body)
        .then(job_sector =>{
            const message = `Le secteur d'emploi ${req.body.job_sector_name} a bien été créé. `
            res.json({ message, data: job_sector })
        })
        .catch( error =>{
            if(error instanceof ValidationError){
                return res.status(400).json({ message: error.message, data: error})
              }
              if( error instanceof UniqueConstraintError){
                return res.status(400).json({message: error.message, data: error})
              }
              const message = "Le secteur d'emploi n'a pas été ajouté. Réessayez dans quelques instants."
              res.status(500).json({ message, data: error})
        })
    })
}