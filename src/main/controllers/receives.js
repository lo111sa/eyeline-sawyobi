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
