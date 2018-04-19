'use strict';
const Hapi=require('hapi');

// Create a server with a host and port
const server=Hapi.server({
    host:'localhost',
    port:8000
});
const MySQL = require('mysql');

// Create a server with a host and port


const connection = MySQL.createConnection({
     host: 'localhost',
     user: 'Your username',
     password: 'Your password',
     database: 'Your database_name'
});


connection.connect();