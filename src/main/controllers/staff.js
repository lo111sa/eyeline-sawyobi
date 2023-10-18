import { db } from '../index'

//Get staff names
export const getStuffList = async (event, id) => {
  try {
    await db.all('SELECT * FROM staff', (error, rows) => {
      event.sender.send('staff', rows)
    })
  } catch (error) {
    event.sender.send('staff', { message: 'შეცდომა!!!', error })
  }
}
