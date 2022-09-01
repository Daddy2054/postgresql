import client from "../database.js";
var BookStore = /** @class */ (function () {
    function BookStore() {
    }
    // another testing version
    //async index(): Promise<Book[]> {
    BookStore.prototype.index3 = function () {
        console.log("start index() method here");
        try {
            client.connect();
        }
        catch (err) {
            throw new Error("Cannot get books ".concat(err));
        }
        var sql = "SELECT * FROM books;";
        console.log("start query here");
        client.query(sql, function (err, res) {
            //     Client.release();
            client.end();
            if (err) {
                throw new Error("Cannot get books ".concat(err));
            }
            console.log(res.rows);
            return res.rows;
        });
    };
    /*async index5(): Promise<Book[]> {
      //let result1: Promise<Book[]>;
  
      client
        .connect()
        .then(() => console.log("connected"))
        .catch((err) => console.error("connection error", err.stack));
  
      client
        .query("SELECT * FROM books;")
        .then(() => client.end())
        .catch((err) => console.error("query error", err.stack));
    }
  */
    BookStore.prototype.index1_old = function () {
        // new version
        client
            .connect()
            .then(function () { return console.log("connected"); })
            .catch(function (err) { return console.error("connection error", err.stack); });
        var res = client
            .query("SELECT * FROM books;")
            .then(function () {
            //  console.log(res.rows);
            return res;
        })
            .then(function () { return client.end(); })
            .catch(function (e) { return console.error(e.stack); })
            .then(function (e) {
            throw new Error("Could not get books. Error: ".concat(e));
        });
        //   client.end();
        return res;
    };
    BookStore.prototype.index_old = function () {
        // old version
        client
            .connect()
            .then(function () { return console.log("connected"); })
            .catch(function (err) { return console.error("connection error", err.stack); });
        client
            .query("SELECT * FROM books;")
            .then(function (result) { return console.log(result.rows); })
            .catch(function (e) { return console.error(e.stack); })
            .then(function (e) {
            throw new Error("Could not get books. Error: ".concat(e));
        })
            .then(function () { return client.end(); });
    };
    BookStore.prototype.show = function (id) {
        client
            .connect()
            .then(function () { return console.log("connected"); })
            .catch(function (err) { return console.error("connection error", err.stack); });
        client
            .query("SELECT * FROM books WHERE id=($1)", [id])
            .then(function (result) { return console.log(result.rows); })
            .catch(function (e) { return console.error(e.stack); })
            .then(function (e) {
            throw new Error("Could not find book ".concat(id, ". Error: ").concat(e));
        })
            .then(function () { return client.end(); });
    };
    BookStore.prototype.create = function (b) {
        client
            .connect()
            .then(function () { return console.log("connected"); })
            .catch(function (err) { return console.error("connection error", err.stack); });
        client
            .query("INSERT INTO books (title, author, total_pages, summary) VALUES($1, $2, $3, $4) RETURNING *", [b.title, b.author, b.totalPages, b.summary])
            .then(function (result) { return console.log(result.rows); })
            .catch(function (e) { return console.error(e.stack); })
            .then(function (e) {
            throw new Error("Could not add new book ".concat(b.title, ". Error: ").concat(e));
        })
            .then(function () { return client.end(); });
    };
    BookStore.prototype.delete = function (id) {
        client
            .connect()
            .then(function () { return console.log("connected"); })
            .catch(function (err) { return console.error("connection error", err.stack); });
        client
            .query("DELETE FROM books WHERE id=($1)", [id])
            .then(function (result) { return console.log(result.rows); })
            .catch(function (e) { return console.error(e.stack); })
            .then(function (e) {
            throw new Error("Could not delete book ".concat(id, ". Error: ").concat(e));
        })
            .then(function () { return client.end(); });
    };
    return BookStore;
}());
export { BookStore };
// testing version: working!
var Books = /** @class */ (function () {
    function Books() {
    }
    //async index(): Promise<Book[]> {
    Books.prototype.index = function () {
        console.log("start index() method here");
        try {
            client.connect();
        }
        catch (err) {
            throw new Error("Cannot get books ".concat(err));
        }
        var sql = "SELECT * FROM books;";
        console.log("start query here");
        client.query(sql, function (err, res) {
            //     Client.release();
            client.end();
            if (err) {
                throw new Error("Cannot get books ".concat(err));
            }
            //console.log(res.rows);
            return res.rows;
        });
    };
    // working version
    //  async index(): Promise<Book[]> {
    Books.prototype.index_working = function () {
        console.log("start index() method here");
        try {
            var conn = client.connect();
        }
        catch (err) {
            throw new Error("Cannot get books ".concat(err));
        }
        var sql = "SELECT * FROM books;";
        console.log("start query here");
        client.query(sql, function (err, res) {
            //     Client.release();
            client.end();
            if (err) {
                throw new Error("Cannot get books ".concat(err));
            }
            console.log(res.rows);
            return res.rows;
        });
    };
    return Books;
}());
export { Books };
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
//const books = new BookStore();
console.log(books.index());
