const { Company } = require('../../db/sequelize')
const {authentadmin} = require('../../db/auth')

module.exports = (app) => {
  app.delete('/api/deleteCompany/:id',authentadmin, (req, res) => {
    Company.findByPk(req.params.id).then(company => {
      if(company === null){
        const message = `L'entreprise demandé n'existe pas. Réessayez avec un autre identifiant`;
        return res.status(404).json({message})
      }
      const companyDeleted = company;
      return Company.destroy({
        where: { id: company.id }
      })
      .then(_ => {
        const message = `L'entreprise avec l'identifiant n°${companyDeleted.id} a bien été supprimé.`
        res.json({message, data: companyDeleted })
      })
      .catch(error => {
        const message = 'L\'entreprise n\'a pas pu être supprimé. Réessayez dans quelques instants.'
        res.status(500).json({ message, data : error})
      })
    })
  })
} 