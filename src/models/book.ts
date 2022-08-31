//import { QueryResult } from "pg";
import { QueryResult } from "pg";
import client from "../database.js";

export type Book = {
  id: number;
  title: string;
  author: string;
  totalPages: number;
  summary: string;
};

// new version from pg-admin docs
export class BookStore {
  index(): void {
    client
      .connect()
      .then(() => console.log("connected"))
      .catch((err) => console.error("connection error", err.stack));
    client
      .query("SELECT * FROM books;")
      .then((result) => console.log(result.rows))
      .catch((e) => console.error(e.stack))
      .then((e) => {
        throw new Error(`Could not get books. Error: ${e}`);
      })
      .then(() => client.end());
  }

  show(id: string): void {
    client
      .connect()
      .then(() => console.log("connected"))
      .catch((err) => console.error("connection error", err.stack));
    client
      .query("SELECT * FROM books WHERE id=($1)", [id])
      .then((result) => console.log(result.rows))
      .catch((e) => console.error(e.stack))
      .then((e) => {
        throw new Error(`Could not find book ${id}. Error: ${e}`);
      })
      .then(() => client.end());
  }

  create(b: Book): void {
    client
      .connect()
      .then(() => console.log("connected"))
      .catch((err) => console.error("connection error", err.stack));
    client
      .query(
        "INSERT INTO books (title, author, total_pages, summary) VALUES($1, $2, $3, $4) RETURNING *",
        [b.title, b.author, b.totalPages, b.summary]
      )
      .then((result) => console.log(result.rows))
      .catch((e) => console.error(e.stack))
      .then((e) => {
        throw new Error(`Could not add new book ${b.title}. Error: ${e}`);
      })
      .then(() => client.end());
  }

  delete(id: string): void {
    client
      .connect()
      .then(() => console.log("connected"))
      .catch((err) => console.error("connection error", err.stack));
    client
      .query("DELETE FROM books WHERE id=($1)", [id])
      .then((result) => console.log(result.rows))
      .catch((e) => console.error(e.stack))
      .then((e) => {
        throw new Error(`Could not delete book ${id}. Error: ${e}`);
      })
      .then(() => client.end());
  }
}

/*
// working version
export class Books {
//  async index(): Promise<Book[]> {
   index() {
    console.log("start index() method here");
    try {
      const conn=Client.connect();
    } catch (err) {
      throw new Error(`Cannot get books ${err}`);
    }

    const sql = "SELECT * FROM books;";
    console.log("start query here");
    Client.query(sql, (err, res) => {
 //     Client.release();
     Client.end();      
      if (err) {
        throw new Error(`Cannot get books ${err}`);
      }

      console.log(res.rows);
      return res.rows;
    });
  }
}

/*
export class Books {
  async index(): Promise<Book[]> {
    try {
      // @t2s-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM books";
      // dfg@sdafgt2s-igsfdghbsnore
      const result = conn.query(sql);
      // @ts-ignore
      //     conn.end();
      conn.release();
      // @ts-ignore
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get books ${err}`);
    }
  }
}
*/
const books = new Books();

console.log(books.index());
