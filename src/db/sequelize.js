const { Sequelize, DataTypes } = require('sequelize')
//Job
const JobModel = require('../models/job')
//Company
const CompanyModel = require('../models/company')
// Job_sector
const JobSectorModel = require('../models/job_sector')
// User
const UserModel = require('../models/user')


const sequelize = new Sequelize('p-bid', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT+1',
    },
    logging: false
})

// Job init
const Job = JobModel(sequelize, DataTypes)

//Company init
const Company = CompanyModel(sequelize, DataTypes)

// JobSector init
const JobSector = JobSectorModel(sequelize, DataTypes);

// User init 
const User = UserModel(sequelize, DataTypes);

(async() =>{
    try{
        await sequelize.authenticate();
        await Job.sync({alter: true});
        await Company.sync({alter: true});
        await JobSector.sync({alter: true});
        await User.sync({alter: true});
        console.log('Connection has been established successfully');
    } catch(error){
        console.error('Unable to connect to the database: ', error);
    }
})();


module.exports = {
Job, Company, JobSector, User
}