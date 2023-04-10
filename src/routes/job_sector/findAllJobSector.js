const { JobSector } = require('../../db/sequelize')
const job_sector = require('../../models/job_sector')
const { Op} = require('sequelize')
  
module.exports = (app) => {
  app.get('/api/findAllJobSector', (req, res) => {
    if(req.query.job_sector_name){
      const job_sector_name = req.query.job_sector_name
      const limit = parseInt(req.query.limit) || 10

      if(job_sector_name.length<2){
        const message = "Le terme de recherche doit contenir au minimum 2 caractères."
        return res.status(400).json({message})
      }
      return JobSector.findAndCountAll({where: 
         { 
          job_sector_name:{ 
            [Op.like]: `%${job_sector_name}%` // critère de la recherche
          } 
        },
        order: ['job_sector_name'],
        limit: limit
      })
      .then(({count,rows})=>{
        const message = `Il y a ${count} secteurs qui correspondent au terme de recherche ${job_sector_name}.`
        res.json({message, data: rows.reverse() })
      })
    } else{
      JobSector.findAll({ order: ['createdAt']})
      .then(job_sector => {
        const message = 'La liste des secteurs disponibles a bien été récupérée.'
        res.json({ message, data: job_sector })
      })
      .catch(error => {
        const message = `La liste des secteurs n'a pas pu être récupérée. Réessayez dans quelques instants.`
        res.status(500).json({message, data: error})

      })
    }
   
  })
} 