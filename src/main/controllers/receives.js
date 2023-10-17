import { db } from '../index'

//Get single Received product info
export const getReceivedProductInfo = async (event, id) => {
  try {
    await db.all('SELECT * FROM received where productId = $id', { $id: id }, (error, rows) => {
      event.sender.send('received-by-id', rows)
    })
  } catch (error) {
    event.sender.send('received-by-id', { message: 'შეცდომა!!!', error })
  }
}

//Add count when product received
export const receiveProduct = async (event, { name, count, id }) => {
  try {
    db.serialize(() => {
      db.run('UPDATE products SET count = count + $count WHERE id = $id', {
        $id: id,
        $count: count
      })

      let date = new Date().toLocaleDateString()
      let time = new Date().toLocaleTimeString()
      db.run(
        `INSERT INTO received (productId,name,count,date,time) VALUES(?,?,?,?,?)`,
        [id, name, count, date, time],
        function (error) {
          event.sender.send('receive', { message: 'ok', count: count })
        }
      )
    })
  } catch (error) {}
}
