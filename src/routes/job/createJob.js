const { UniqueConstraintError, ValidationError} = require('sequelize')
const { Job } = require('../../db/sequelize')
const {authentadminuser} = require('../../db/auth')

module.exports = (app) =>{
    app.post('/api/createJob',authentadminuser, (req, res) =>{
        Job.create(req.body)
        .then(job =>{
            const message = `L'emploi ${req.body.job_name} a bien été créé. `
            res.json({ message, data: job })
        })
        .catch( error =>{
            if(error instanceof ValidationError){
                return res.status(400).json({ message: error.message, data: error})
              }
              if( error instanceof UniqueConstraintError){
                return res.status(400).json({message: error.message, data: error})
              }
              const message = "L'emploi n'a pas été ajouté. Réessayez dans quelques instants."
              res.status(500).json({ message, data: error})
        })
    })
}