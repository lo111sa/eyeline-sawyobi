import { create } from 'zustand'

export const useModalStore = create((set) => ({
  isOpen: false,
  modalType: '',

  //Open modal
  openModal: () => {
    set({ isOpen: true })
  },

  //close modal
  closeModal: () => {
    set({ isOpen: false })
  },

  //Set modal type
  setModalType: (type) => {
    set({ modalType: type })
  }
}))
