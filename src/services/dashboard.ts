import client from '../database'

export class DashboardQueries {
  // Get all products that have been included in orders
  async productsInOrders(): Promise<{name: string, price: number, order_id: string}[]> {
    try {
      //@ts-ignore
      const conn = await client.connect()
      const sql = 'SELECT name, price, order_id FROM products INNER JOIN order_products ON product.id = order_products.id'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`)
    } 
  }

  // select * from products order by price desc limit 5;
  async fiveMostExpensiveProducts(): Promise<{title: string, price: number}[]> {
    try {
      //@ts-ignore
      const conn = await client.connect()
      const sql = "SELECT * FROM products ORDER BY price DESC LIMIT 5;"

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get five most expensive products: ${err}`)
    } 
  }
}