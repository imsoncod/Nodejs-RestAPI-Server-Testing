var mysql = require('mysql');
var db_config = require('./db_config.json');

var db_info = {
    host: db_config.host,
    port: db_config.port,
    user: db_config.user,
    password: db_config.password,
    database: db_config.database
}

module.exports = {
    init: function(){
        return mysql.createConnection(db_info);
    },
    connect: function(conn){
        conn.connect(function(err){
            if(err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected successfully!');
        })
    }
}