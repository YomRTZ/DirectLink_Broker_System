// src/components/chat_components/ModalComponent.js

import React, { useContext } from 'react';
import { Modal, Button } from "flowbite-react";
import { useModalContext } from "../../context/ModalContext";

export function ModalComponent() {
  const { isModalOpen, closeModal, modalData } = useModalContext(); // Get modal data and control functions

  if (!modalData?.user) {
    return null; // Don't render the modal if there is no user data
  }

  return (
    <Modal show={isModalOpen} size="md" onClose={closeModal} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            {`Profile Info: ${modalData.user.displayName}`}
          </h3>
          <div>
            <img src={modalData.user.photoURL} alt="User Profile" className="w-20 h-20 rounded-full" />
            <p>Email: {modalData.user.email}</p>
            <p>Other details can go here...</p>
          </div>

          <div>
            <Button color="green" onClick={closeModal}>
              Close
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
