const { User } = require('../../db/sequelize')
const { Op} = require('sequelize')
const {authentadmin} = require('../../db/auth')
  
module.exports = (app) => {
  app.get('/api/findAllUser' ,authentadmin, (req, res) => {
    if(req.query.username){
      const username = req.query.username
      const limit = parseInt(req.query.limit) || 10

      if(username.length<2){
        const message = "Le terme de recherche doit contenir au minimum 2 caractères."
        return res.status(400).json({message})
      }
      return User.findAndCountAll({where: 
         { 
          username:{ 
            [Op.like]: `%${ username}%` // critère de la recherche
          } 
        },
        order: ['username'],
        limit: limit
      })
      .then(({count,rows})=>{
        const message = `Il y a ${count} utilisateur(s) qui correspondent au terme de recherche ${username}.`
        res.json({message, data: rows.reverse() })
      })
    } else{
      User.findAll({ order: ['createdAt']})
      .then( user => {
        const message = 'La liste des utilisateurs disponibles a bien été récupérée.'
        res.json({ message, data: user })
      })
      .catch(error => {
        const message = `La liste des utilisateurs n'a pas pu être récupérée. Réessayez dans quelques instants.`
        res.status(500).json({message, data: error})

      })
    }
   
  })
} 