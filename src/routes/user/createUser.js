const { UniqueConstraintError, ValidationError} = require('sequelize')
const { User } = require('../../db/sequelize')
const bcrypt = require('bcrypt')
const {authentadmin} = require('../../db/auth')

module.exports = (app) =>{
    app.post('/api/createUser' ,authentadmin, (req, res) =>{
        const username = req.body.username, 
        company_id = req.body.company_id,
        password = req.body.password;
        const role = req.body.role || "user";
  (async()=> {
    const salt = await bcrypt.genSalt(10);
    bcrypt.hash(password, salt)
    .then(hash =>
          User.create({
              username: username,
              password: hash,
              company_id: company_id,
              role: role
          })
          .then(user =>{
              const message = `L'utilisateur ${user.username} a bien été créé. `
              res.json({ message, data: user })
          })
          .catch( error =>{
              if(error instanceof ValidationError){
                  return res.status(400).json({ message: error.message, data: error})
                }
                if( error instanceof UniqueConstraintError){
                  return res.status(400).json({message: error.message, data: error})
                }
                const message = "L'utilisateur n'a pas été ajouté. Réessayez dans quelques instants."
                res.status(500).json({ message, data: error})
          })
    )
  })();
 
    })
}