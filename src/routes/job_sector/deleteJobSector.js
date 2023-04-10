const { JobSector } = require('../../db/sequelize')
const {authentadminuser} = require('../../db/auth')
  
module.exports = (app) => {
  app.delete('/api/deleteJobSector/:id',authentadminuser, (req, res) => {
    JobSector.findByPk(req.params.id).then(job_sector => {
      if(job_sector === null){
        const message = `Le secteur demandé n'existe pas. Réessayez avec un autre identifiant`;
        return res.status(404).json({message})
      }
      const job_sectorDeleted = job_sector;
      return JobSector.destroy({
        where: { id: job_sector.id }
      })
      .then(_ => {
        const message = `Le secteur avec l'identifiant n°${job_sectorDeleted.id} a bien été supprimé.`
        res.json({message, data: job_sectorDeleted })
      })
      .catch(error => {
        const message = 'Le secteur n\'a pas pu être supprimé. Réessayez dans quelques instants.'
        res.status(500).json({ message, data : error})
      })
    })
  })
} 