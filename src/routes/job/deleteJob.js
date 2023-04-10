const { Job } = require('../../db/sequelize')
const {authentadminuser} = require('../../db/auth')
  
module.exports = (app) => {
  app.delete('/api/deleteJob/:id',authentadminuser, (req, res) => {
    Job.findByPk(req.params.id).then(job => {
      if(job === null){
        const message = `L'emploi demandé n'existe pas. Réessayez avec un autre identifiant`;
        return res.status(404).json({message})
      }
      const jobDeleted = job;
      return Job.destroy({
        where: { id: job.id }
      })
      .then(_ => {
        const message = `L'emploi avec l'identifiant n°${jobDeleted.id} a bien été supprimé.`
        res.json({message, data: jobDeleted })
      })
      .catch(error => {
        const message = 'L\'emploi n\'a pas pu être supprimé. Réessayez dans quelques instants.'
        res.status(500).json({ message, data : error})
      })
    })
  })
} 