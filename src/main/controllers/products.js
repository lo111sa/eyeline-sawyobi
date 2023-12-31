import { db } from '../index'
import { format } from '../utils/functions'

//Get Products
export const getProducts = async (event, received) => {
  try {
    await db.all(
      'SELECT * FROM products where name LIKE $title ORDER BY name',
      { $title: `%${received}%` },
      (error, rows) => {
        event.sender.send('send', rows)
      }
    )
  } catch (error) {
    event.sender.send('send', { message: 'შეცდომა!!!', error })
  }
}

//Add new product
export const AddProduct = async (event, received) => {
  try {
    await db.run(
      `INSERT INTO products (name,count) VALUES(?,?)`,
      [received.name, received.count],
      function (error) {
        // console.log(this.lastID)
        event.sender.send('add-new-product', { id: this.lastID, ...received })

        let date = format(new Date())
        let time = new Date().toLocaleTimeString('en-GB')
        db.run(
          `INSERT INTO received (productId,name,count,date,time) VALUES(?,?,?,?,?)`,
          [this.lastID, received.name, received.count, date, time],
          function (error) {
            //   console.log(this.lastID)
          }
        )
      }
    )
  } catch (error) {
    event.sender.send('add-new-product', { message: 'დამატებისას მოხდა შეცდომა', error })
  }
}

//Delete product
export const deleteProduct = async (event, { id }) => {
  try {
    await db.run('DELETE FROM products WHERE id = $id', { $id: id }, (error, rows) => {})
  } catch (error) {
    event.sender.send('delete-product', { message: 'შეცდომა!!!', error })
  }
}
