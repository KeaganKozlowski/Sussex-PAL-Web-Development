//Add Data and connect

var mysql = require('mysql2');

///For one off connection to check that it works properly
var con = mysql.createConnection({
    host: 'krier.uscs.sussex.ac.uk',
    user: 'kk544',
    password: 'Mysql_627115',
    database: 'kk544',
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO Jobs (Title, Company, Location) VALUES ('Senior Software Engineer', 'Red Spike Studios', 'Brighton')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    con.end;
  });
  
});
/*
con.shutdow(function){
    ServiceWorkerRegistration.
}*/