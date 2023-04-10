const { Job } = require('../../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/findJobByPk/:id', (req, res) => {
    Job.findByPk(req.params.id)
      .then( job => {
        const message = 'Un emploi a bien été trouvé.'
        res.json({ message, data: job })
      })
  })
}