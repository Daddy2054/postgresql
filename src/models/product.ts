import client from "../database";

export type Product = {
  id: string;
  title: string;
  price: number;
};
export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM Products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get Products. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const sql = "SELECT * FROM Products WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get Product ${id}. Error: ${err}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const sql =
        "INSERT INTO products (title, price) VALUES($1, $2) RETURNING *";
      const conn = await client.connect();
      //console.log(product)
      const result = await conn.query(sql, [product.title, product.price]);
      conn.release();
      //console.log(result)
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add Product ${product.title}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const sql = "DELETE FROM Products WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const Product = result.rows[0];
      conn.release();
      return Product;
    } catch (err) {
      throw new Error(`Could not delete Product ${id}. Error: ${err}`);
    }
  }
}
