import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null); // Store the modal data

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ModalContext.Provider value={{ isModalOpen, modalData, setModalData, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook to access ModalContext
export const useModalContext = () => useContext(ModalContext);
