const { Company } = require('../../db/sequelize') 
module.exports = (app) => {
  app.get('/api/findCompanyByPk/:id', (req, res) => {
    Company.findByPk(req.params.id)
      .then( company => {
        const message = 'Une entreprise a bien été trouvé.'
        res.json({ message, data: company })
      })
  })
}