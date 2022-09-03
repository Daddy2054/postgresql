import client from "../database";

export type Book = {
  id: number;
  title: string;
  author: string;
  total_pages: number;
  summary: string;
};
export class BookStore {
  async index(): Promise<Book[]> {
    try {
      const conn = await client.connect();
      const result = await conn.query("SELECT * FROM books;");
      conn.release();
      return result.rows as Book[];
    } catch (err) {
      throw new Error(`Could not get books. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Book> {
    try {
      const conn = await client.connect();
      const result = await conn.query("SELECT * FROM books WHERE id=($1);", [
        id,
      ]);
      conn.release();
      return result.rows[0] as Book;
    } catch (err) {
      throw new Error(`Could not find book ${id} Error: ${err}`);
    }
  }

  async update(id: string, title: string): Promise<Book> {
    try {
      const conn = await client.connect();
      const result = await conn.query(
        "UPDATE books SET title = $1 WHERE id=($2) RETURNING *;",
        [title, id]
      );
      conn.release();
      return result.rows[0] as Book;
    } catch (err) {
      throw new Error(`Could not update book ${id} Error: ${err}`);
    }
  }

  async create(b: Book): Promise<Book> {
    try {
      const conn = await client.connect();
      const result = await conn.query(
        "INSERT INTO books (title, author, total_pages, summary) VALUES($1, $2, $3, $4) RETURNING *;",
        [b.title, b.author, b.total_pages, b.summary]
      );
      conn.release();
      return result.rows[0] as Book;
    } catch (err) {
      throw new Error(`Could not add new book ${b.title}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Book> {
    try {
      const conn = await client.connect();
      const result = await conn.query("DELETE FROM books WHERE id=($1);", [id]);
      conn.release();
      // console.log(result.rows[0]);
      return result.rows[0] as Book;
    } catch (err) {
      throw new Error(`Could not delete book ${id}. Error: ${err}`);
    }
  }
}
