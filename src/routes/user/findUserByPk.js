const { User } = require('../../db/sequelize')
const {authentadminuser} = require('../../db/auth')

module.exports = (app) => {
  app.get('/api/findUserByPk/:id',authentadminuser, (req, res) => {
    User.findByPk(req.params.id)
      .then( user => {
        const message = 'Un utilisateur a bien été trouvé.'
        res.json({ message, data: user })
      })
  })
}