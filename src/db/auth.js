const {User} = require('./sequelize')
const dotenv = require('dotenv')
dotenv.config({path:'./src/db/config.env'});
const jwt = require("jsonwebtoken")
const {Op} = require('sequelize')

const authentadmin = (req, res, next) =>{
    if (req.cookies && req.cookies.usertoken) {
        const user = jwt.decode(req.cookies.usertoken);
        User.findOne({
            where :{
            username: {
                [Op.like]: `%${ user.username}%`
            },
            password : {
                [Op.like]: `%${ user.password}`
            },
            role : {
                [Op.like]: `%${ user.role}`
            }
        }
    }).then(info =>{
        if (info) {
            info.role === "admin" ? next() : res.status(403).end()
         }else{
            const message = "Vous n'êtes pas autorisé à accéder à cette page."
      return res.status(404).json({message})
         }
    })
    .catch(error =>{
        return res.status(404).json({data : error})
    })
}
};

const authentadminuser = (req, res, next) =>{
    if (req.cookies && req.cookies.usertoken) {
        const user = jwt.decode(req.cookies.usertoken);
        User.findOne({
            where :{
            username: {
                [Op.like]: `%${ user.username}%`
            },
            password : {
                [Op.like]: `%${ user.password}`
            },
            role : {
                [Op.like]: `%${ user.role}`
            }
        }
    }).then(info =>{
        if (info) {
         next();
         }else{
            const message = "Vous n'êtes pas autorisé à accéder à cette page."
      return res.status(404).json({message})
         }
    })
    .catch(error =>{
        return res.status(404).json({data : error})
    })
}
};

module.exports = {
    authentadmin , authentadminuser
}
