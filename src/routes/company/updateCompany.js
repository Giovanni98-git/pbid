const { ValidationError, UniqueConstraintError} = require('sequelize')
const { Company } = require('../../db/sequelize')
const {authentadminuser} = require('../../db/auth')
  
module.exports = (app) => {
  app.put('/api/updateCompany/:id',authentadminuser, (req, res) => {
    const id = req.params.id
    Company.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Company.findByPk(id).then(company => {
        if(company === null){
          const message = 'L\'entreprise demandé n\'existe pas. Réessayez avec un autre identifiant';
          return res.status(404).json({message})
        }
        const message = `L'entreprise ${company.name} a bien été modifié.`
        res.json({message, data: company })
      })
    })
    .catch(error => {
      if(error instanceof ValidationError){
        return res.status(400).json({ message: error.message, data: error })
      }
      if( error instanceof UniqueConstraintError){
        return res.status(400).json({message: error.message, data: error})
      }
      const message = 'L\'entreprise n\'a pas pu être modifié. Réessayez dans quelques instants.'
      res.status(500).json({ message, data : error})
    })
  })
}