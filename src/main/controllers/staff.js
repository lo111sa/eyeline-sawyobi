import { db } from '../index'

//Get staff names
export const getStuffList = async (event, id) => {
  try {
    await db.all('SELECT * FROM staff ORDER BY name ASC', (error, rows) => {
      event.sender.send('get-staff', rows)
    })
  } catch (error) {
    event.sender.send('get-staff', { message: 'შეცდომა!!!', error })
  }
}

//Add staff
export const AddStaff = async (event, name) => {
  try {
    await db.run('INSERT INTO staff (name) VALUES (?)', [name], (error, rows) => {
      event.sender.send('add-staff', rows)
    })
  } catch (error) {
    event.sender.send('add-staff', { message: 'შეცდომა!!!', error })
  }
}

//Delete staff
export const deleteStaff = async (event, { id }) => {
  try {
    await db.run('DELETE FROM staff WHERE id = $id', { $id: id }, (error, rows) => {})
  } catch (error) {
    event.sender.send('delete-staff', { message: 'შეცდომა!!!', error })
  }
}
