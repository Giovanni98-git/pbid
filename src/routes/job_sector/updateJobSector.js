const { ValidationError, UniqueConstraintError} = require('sequelize')
const { JobSector } = require('../../db/sequelize')
const {authentadminuser} = require('../../db/auth')
  
module.exports = (app) => {
  app.put('/api/updateJobSector/:id',authentadminuser, (req, res) => {
    const id = req.params.id
    JobSector.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return JobSector.findByPk(id).then(job_sector => {
        if(job_sector === null){
          const message = 'Le secteur demandé n\'existe pas. Réessayez avec un autre identifiant';
          return res.status(404).json({message})
        }
        const message = `Le secteur ${job_sector.job_sector_name} a bien été modifié.`
        res.json({message, data: job_sector })
      })
    })
    .catch(error => {
      if(error instanceof ValidationError){
        return res.status(400).json({ message: error.message, data: error })
      }
      if( error instanceof UniqueConstraintError){
        return res.status(400).json({message: error.message, data: error})
      }
      const message = 'Le secteur n\'a pas pu être modifié. Réessayez dans quelques instants.'
      res.status(500).json({ message, data : error})
    })
  })
}