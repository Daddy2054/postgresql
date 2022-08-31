import client from "../database.js";
// new version from pg-admin docs
var Books = /** @class */ (function () {
    function Books() {
    }
    Books.prototype.index = function () {
        client
            .connect()
            .then(function () { return console.log("connected"); })
            .catch(function (err) { return console.error("connection error", err.stack); });
        client
            .query("SELECT * FROM books;")
            .then(function (result) { return console.log(result.rows); })
            .catch(function (e) { return console.error(e.stack); })
            .then(function () { return client.end(); });
    };
    return Books;
}());
export { Books };
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
var books = new Books();
console.log("call index() here");
console.log(books.index());
