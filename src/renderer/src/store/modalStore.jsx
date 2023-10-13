import { create } from 'zustand'

export const useModalStore = create((set) => ({
  isOpen: false,

  //Open modal
  openModal: () => {
    set({ isOpen: true })
  },

  //close modal
  closeModal: () => {
    set({ isOpen: false })
  }
}))
