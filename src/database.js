import dotenv from "dotenv";
//import { Pool } from "pg";
import pkg from "pg";
//const { Pool } = pkg;
var Client = pkg.Client;
dotenv.config();
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD;
var client = new Client({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: 5455,
});
/*
//client.connect();
client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("connected");
  }
});
client.on("error", (err) => {
  console.error("something bad has happened!", err.stack);
});

//client.query("select now()", (err, res) => {
  client.query("select * from books;", (err, res) => {
    console.log(err, res.rows);
  client.end();
});
*/
/*
client.query("select * from sightings1", (err, res:QueryResult) => {
  if (err) throw err;
  console.log(res.rows);

});
client.end();
*/
export default client;
