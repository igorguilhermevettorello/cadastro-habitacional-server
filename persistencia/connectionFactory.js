var mysql  = require('mysql');

function createDBConnection() {

  if (!process.env.NODE_ENV ||
        process.env.node === 'dev' ||
        process.env.node === 'development') {
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'mysqlroot',
      database: 'api_sistema_habitacao',
      multipleStatements: true
    });
  }

  //implementar if if(process.env.NODE_ENV == 'production') {

  if(process.env.NODE_ENV == 'test') {
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'mysqlroot',
      database: 'api_sistema_habitacao_teste',
      multipleStatements: true
    });
  }

  if (process.env.NODE_ENV == 'production') {
    return mysql.createConnection({
      host: 'hab_29c6f15.mysql.dbaas.com.br',
      user: 'hab_29c6f15',
      password: 'af9ecabd',
      database: 'hab_29c6f15',
      multipleStatements: true
    });
  }
}

module.exports = function() {
    return createDBConnection;
}