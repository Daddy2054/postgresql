import * as dotenv from "dotenv";
import { Pool } from "pg";

//import pkg from "pg";
//const { Pool } = pkg;
//const { Client } = pkg;
import { Client } from "pg";
dotenv.config();

const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } =
  process.env;

//  const client = new Client({
    const client = new Pool({
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
