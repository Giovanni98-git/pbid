const { Job } = require('../../db/sequelize')
const { Op} = require('sequelize') 
const {authentadmin} = require('../../db/auth')

module.exports = (app) => {
  app.get('/api/findAllJob',authentadmin, (req, res) => {
    if(req.query.job_name){
      const job_name = req.query.job_name
      const limit = parseInt(req.query.limit) || 10

      if(job_name.length<2){
        const message = "Le terme de recherche doit contenir au minimum 2 caractères."
        return res.status(400).json({message})
      }
      return Job.findAndCountAll({where: 
         { 
          job_name:{ 
            [Op.like]: `%${job_name}%` // critère de la recherche
          } 
        },
        order: ['job_name'],
        limit: limit
      })
      .then(({count,rows})=>{
        const message = `Il y a ${count} emplois qui correspondent au terme de recherche ${job_name}.`
        res.json({message, data: rows.reverse() })
      })
    } else{
      Job.findAll({order: ['publication_date']})
      .then(jobs => {
        const message = 'La liste des emplois disponibles a bien été récupérée.'
        res.json({ message, data: jobs })
      })
      .catch(error => {
        const message = `La liste des emplois n'a pas pu être récupérée. Réessayez dans quelques instants.`
        res.status(500).json({message, data: error})

      })
    }
   
  })
} 