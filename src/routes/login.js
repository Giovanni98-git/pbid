const cookieParser = require("cookie-parser")
const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const { Op} = require('sequelize')
const jwt = require('jsonwebtoken')

const dotenv = require('dotenv')
dotenv.config({path:'./src/db/config.env'})

const accessTokenSecret = process.env.tokenSecret;

module.exports = (app) =>{
    app.post("/api/login", (req, res) => {
        
        const { username, password } = req.body;

        let user;

        (async () => {
             User.findOne({
                where :{
                username: {
                    [Op.like]: `%${ username}%`
                }
            }}).then ( user => {
                if(user){
                    bcrypt.compare(password, user.password).then(
                        u => {
                            if (u) {
                                const accessToken = jwt.sign({ username: user.username, role: user.role , password : user.password}, accessTokenSecret);
                                       res.cookie('usertoken', accessToken, { maxAge: 5400000, httpOnly: true })
                                           .end()
                                   } else {
                                       res.send(" password incorrect");
                                   }
                        })
                }else{
                    res.send("username incorrect");
                }
            
            })
        })();    
    })

}