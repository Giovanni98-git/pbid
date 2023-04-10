const { ValidationError, UniqueConstraintError} = require('sequelize')
const { Job } = require('../../db/sequelize')
const {authentadminuser} = require('../../db/auth')
  
module.exports = (app) => {
  app.put('/api/updateJob/:id',authentadminuser, (req, res) => {
    const id = req.params.id
    Job.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Job.findByPk(id).then(job => {
        if(job === null){
          const message = 'L\'emploi demandé n\'existe pas. Réessayez avec un autre identifiant';
          return res.status(404).json({message})
        }
        const message = `L'emploi ${job.job_name} a bien été modifié.`
        res.json({message, data: job })
      })
    })
    .catch(error => {
      if(error instanceof ValidationError){
        return res.status(400).json({ message: error.message, data: error })
      }
      if( error instanceof UniqueConstraintError){
        return res.status(400).json({message: error.message, data: error})
      }
      const message = 'L\'emploi n\'a pas pu être modifié. Réessayez dans quelques instants.'
      res.status(500).json({ message, data : error})
    })
  })
}