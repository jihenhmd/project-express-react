// importer la classe sequelize
const {Sequelize} = require('sequelize');
// conncexion au base de données 
const sequelize=new Sequelize('test_db','user','pass',{
dialect:'sqlite',
storage:'database.sqlite'
// le fichier de la base de donnée
})

module.exports=sequelize;