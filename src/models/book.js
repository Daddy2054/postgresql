"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.BookStore = void 0;
var database_js_1 = require("../database.js");
var BookStore = /** @class */ (function () {
    function BookStore() {
    }
    BookStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_js_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, database_js_1["default"].query("SELECT * FROM books;")];
                    case 2:
                        result = _a.sent();
                        database_js_1["default"].end();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Could not get books. Error: ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return BookStore;
}());
exports.BookStore = BookStore;
/*
  async index(): Promise<Book[]> { // new version
    client
      .connect()
      .then(() => console.log("connected"))
      .catch((err) => console.error("connection error", err.stack));
    const res: QueryResult = await client
      .query("SELECT * FROM books;")
      .then(() => client.end())
      .then(() => {
        console.log(res.rows);
        return res.rows;
      })
      .catch((e) => console.error(e.stack))
      .then((e) => {
        throw new Error(`Could not get books. Error: ${e}`);
      });
    return res.rows;
  }

  index_old(): void {
    // old version
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
*/
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
var books = new BookStore();
console.log(books.index());
