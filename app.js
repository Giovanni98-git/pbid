const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")

const dotenv = require('dotenv')
dotenv.config({path:'./src/db/config.env'});

const sequelize = require(process.env.db)

const app = express()
const port = process.env.PORT || 3000

app
   .use(bodyParser.json())
   .use(cookieParser())


app.get('/',(req,res) =>{
  res.json('Hello Heroku!')
})

   // Connexion et initialisation de la base de données.
   require(process.env.LOGIN)(app)
   require(process.env.LOGOUT)(app)

   // Ici nous avons nos points de terminaison
   //Emploi
   require(process.env.findAllJobs)(app)// la liste de tous les emplois
   require(process.env.findJobByPk)(app)// rechercher un emploi grace a l'id
   require(process.env.createJob)(app)//creer un emploi
   require(process.env.updateJob)(app)//Mettre à jour un emploi 
   require(process.env.deleteJob)(app)//Supprime un emploi

   //Entreprise
   require(process.env.findAllCompany)(app)
   require(process.env.findCompanyByPk)(app)
   require(process.env.createCompany)(app)
   require(process.env.updateCompany)(app)
   require(process.env.deleteCompany)(app)

   // Secteur D'emploi
   require(process.env.findAllJobSector)(app)
   require(process.env.findJobSectorByPk)(app)
   require(process.env.createJobSector)(app)
   require('./src/routes/job_sector/updateJobSector')(app)
   require('./src/routes/job_sector/deleteJobSector')(app)
   
   // Utilisateur
   require('./src/routes/user/findAllUser')(app)
   require('./src/routes/user/findUserByPk')(app)
   require('./src/routes/user/createUser')(app)
   require('./src/routes/user/deleUser')(app)
   require('./src/routes/user/updateUser')(app)


 //On ajoute la gestion des erreurs 404
 app.use(({res}) => {
   const message = 'Impossible de trouver la ressource  demandée ! Vous pouvez essayer une autre URL.'
   res.status(404).json({message})
})
app.listen(port, ()=> console.log(`Notre application Node est démarrée sur: http://localhost:${port}`)) 