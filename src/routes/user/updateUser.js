const { ValidationError, UniqueConstraintError} = require('sequelize')
const { User } = require('../../db/sequelize')
const bcrypt = require('bcrypt')
const {authentadminuser} = require('../../db/auth')
  
module.exports = (app) => {
  app.put('/api/updateUser/:id',authentadminuser, (req, res) => {
    const password = req.body.password;
    const id = req.params.id,
    username = req.body.username;
    User.findByPk(id).then( user =>{
     (async() =>{
      const compare = await bcrypt.compare(password, user.password);
      let pass = user.password;
     if(!compare){
      const salt  = await bcrypt.genSalt(10);
      pass = await bcrypt.hash(password, salt)
     }
     User.update({
      username : username,
      password : pass
     }, {
      where: { id: id }
    })
    .then(_ => {
      return User.findByPk(id).then(user => {
        if(user === null){
          const message = 'L\'utilisateur demandé n\'existe pas. Réessayez avec un autre identifiant';
          return res.status(404).json({message})
        }
        const message = `L'utilisateur ${username} a bien été modifié.`
        res.json({message, data: user })
      })
    })
    .catch(error => {
      if(error instanceof ValidationError){
        return res.status(400).json({ message: error.message, data: error })
      }
      if( error instanceof UniqueConstraintError){
        return res.status(400).json({message: error.message, data: error})
      }
      const message = 'L\'utilisateur n\'a pas pu être modifié. Réessayez dans quelques instants.'
      res.status(500).json({ message, data : error})
    })    
      })();
    }).catch(error =>{
      const message = "Aucun utilisateur ayant cet identifiant n'existe."
      return res.status(404).json({message})
    })
  })
}