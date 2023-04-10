const { JobSector } = require('../../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/findJobSectorByPk/:id', (req, res) => {
    JobSector.findByPk(req.params.id)
      .then( job_sector => {
        const message = 'Un secteur d\'emploi a bien été trouvé.'
        res.json({ message, data: job_sector })
      })
  })
}