import { db } from '../index'

//Get single Received product info
export const getIssuedProductInfo = async (event, id) => {
  try {
    await db.all('SELECT * FROM received where productId = $id', { $id: id }, (error, rows) => {
      event.sender.send('get-issued', rows)
    })
  } catch (error) {
    event.sender.send('get-issued', { message: 'შეცდომა!!!', error })
  }
}

//
export const issueProduct = async (event, { count, name, id, staffId, staffName }) => {
  try {
    await db.serialize(() => {
      db.run('UPDATE products SET count = count - $count WHERE id = $id', {
        $id: id,
        $count: count
      })

      let date = new Date().toLocaleDateString()
      let time = new Date().toLocaleTimeString()
      db.run(
        `INSERT INTO issued (productId,name,count,staffId,staffName,date,time) VALUES (?,?,?,?,?,?,?)`,
        [id, name, count, staffId, staffName, date, time],
        function (error) {
          event.sender.send('issue', { message: 'ok', count: count })
        }
      )
    })
  } catch (error) {
    console.log('error')
  }
}
