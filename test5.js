var Hapi=require('hapi');
var mysql      = require('mysql');
var server=new Hapi.server({port:3000});
const http = require('http');
//server.connection({port:3000});



var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'user123',
  
  database : 'db',
  
});
var reo ='<html><head><title>Node.js MySQL Select</title></head><body><h1>Node.js MySQL Select</h1>{${table}}</body></html>';
connection.connect();
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, res) {
       connection.query("select * from test1",
       function (error, results, fields) {
       if (error) throw error;
	  
	  
	  var table =''; //to store html table

      //create html table with data from res.
      for(var i=0; i<results.length; i++){
        table +='<tr><td>'+ (i+1) +'</td><td>'+ results[i].name +'</td></tr>';
      }
      table ='<table border="1"><tr><th>Nr.</th><th>Name</th><th>Address</th></tr>'+ table +'</table>';

     // con.release(); //Done with mysql connection

    //  return res.response(table);
	

for (let i = 0; i < results.length-1; ++i) {
    console.log(results[i]);
}
	  
	  
	  
	  
	  
	  
			/*res.write("<table>");
            res.write("<tr>");
            for(var column in results[0]){
                res.write("<td><label>" + column + "</label></td>");*/
            //}
      //else  console.log(results);
    });
  return "hi";}
});
/*
server.route({method:'GET',path:'/',
handler:function(request,reply){
//connection.query('SELECT 1 + 1 AS solution', function (error, results, fields)
var a=connection.query('SELECT * from `test` where `id`=1', function (error, results, fields)
 {
  if (error) throw error;
return('The solution is:'+results);}
);
console.log(a.sql);
return "hia";}

/*server.connect(function(err) {
  if (err) throw err;
  connection.query("SELECT * FROM test", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
 

 */

//});

/*const servers = http.createServer((req, res)=>{
  setResHtml(sql, resql=>{
    reo = reo.replace('{${table}}', resql);
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    res.write(reo, 'utf-8');
    res.end();
  });
});*/
server.start(function(){console.log('server is running');});
 
