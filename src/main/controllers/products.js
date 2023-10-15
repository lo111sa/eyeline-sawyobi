const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('D:/DB.db')

//Get Products
export const getProducts = async (event, received) => {
  try {
    await db.all(
      'SELECT * FROM products where name LIKE $title',
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
    db.run(
      `INSERT INTO products (name,count) VALUES(?,?)`,
      [received.name, received.count],
      function (error) {
        console.log(this.lastID);
        event.sender.send('add-new-product', {id: this.lastID, ...received})
      }
    )
  } catch (error) {
    event.sender.send('add-new-product', { message: 'დამატებისას მოხდა შეცდომა', error })
  }
}
