import client from "../database";

export type OrderProducts = {
  quantity: number;
  order_id: string;
  product_id: string;
};

export class Cart {
  async addProduct(order_products: OrderProducts): Promise<OrderProducts> {
    try {
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2,$3) RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [
        order_products.quantity,
        order_products.order_id,
        order_products.product_id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add product ${order_products.product_id} to order ${order_products.order_id}.  ${err}`
      );
    }
  }

  async deleteProduct(order_products: OrderProducts): Promise<OrderProducts> {
    try {
      const sql = "DELETE FROM order_products WHERE order_id=($1) AND product_id=($2) RETURNING *; ";
      const conn = await client.connect();
      const result = await conn.query(sql, [
        order_products.order_id,
        order_products.product_id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not delete product ${order_products.product_id} to order ${order_products.order_id}.  ${err}`
      );
    }
  }
}
