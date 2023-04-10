const { Company } = require('../../db/sequelize')
const { Op} = require('sequelize')
const {authentadmin} = require('../../db/auth')
  
module.exports = (app) => {
  app.get('/api/findAllCompany',authentadmin, (req, res) => {
    if(req.query.name){
      const name = req.query.name
      const limit = parseInt(req.query.limit) || 10

      if(name.length<2){
        const message = "Le terme de recherche doit contenir au minimum 2 caractères."
        return res.status(400).json({message})
      }
      return Company.findAndCountAll({where: 
         { 
          name:{ 
            [Op.like]: `%${name}%` // 'name' est le critère de la recherche
          } 
        },
        order: ['name'],
        limit: limit
      })
      .then(({count,rows})=>{
        const message = `Il y a ${count} entreprises qui correspondent au terme de recherche ${name}.`
        res.json({message, data: rows.reverse() })
      })
    } else{
      Company.findAll({order: ['createdAt']})
      .then(company => {
        const message = 'La liste des entreprises disponibles a bien été récupérée.'
        res.json({ message, data: company })
      })
      .catch(error => {
        const message = `La liste des entreprises n'a pas pu être récupérée. Réessayez dans quelques instants.`
        res.status(500).json({message, data: error})

      })
    }
   
  })
} 