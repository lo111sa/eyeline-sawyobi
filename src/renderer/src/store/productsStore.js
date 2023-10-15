import { create } from 'zustand'
const ipcRenderer = window.ipcRenderer

export const useProductsStore = create((set) => ({
  data: [],

  //fetch products
  fetchProducts: (search) => {
    ipcRenderer.send('send', search)
    ipcRenderer.on('send', (res) => {
      set({ data: res })
      ipcRenderer.off()
    })
  },

  //Add product
  addProduct: (data) => {
    ipcRenderer.send('add-new-product', data)
    ipcRenderer.on('add-new-product', (res) => {
      if (res?.id) {
        set((state) => ({
          data: [...state.data, res]
        }))
      }
      ipcRenderer.off()
    })
  }
}))
