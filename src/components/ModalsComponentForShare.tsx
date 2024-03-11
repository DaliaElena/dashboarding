import React, { useState } from 'react';
import { Modal, Row, Col, Form, Badge, Button as ButtonBootstrap } from 'react-bootstrap';

const ModalsComponentForShare = () => {
  // State y funciones para el primer modal
  const [showShareModal, setShowShareModal] = useState(false);
  const handleCloseShareModal = () => setShowShareModal(false);
  const handleShowShareModal = () => setShowShareModal(true);

  // State y funciones para el segundo modal
  const [showThirdModal, setShowThirdModal] = useState(false);
  const handleCloseThirdModal = () => setShowThirdModal(false);
  const handleShowThirdModal = () => setShowThirdModal(true);

  // Otras funciones y estados necesarios para tus modales

  return (
    <>
      {/* Primer modal */}
      <Modal show={showShareModal} onHide={handleCloseShareModal} size="lg">
        {/* Contenido del primer modal */}
      </Modal>

      {/* Segundo modal */}
      <Modal show={showThirdModal} onHide={handleCloseThirdModal} size="lg">
        {/* Contenido del segundo modal */}
      </Modal>
    </>
  );
};

export default ModalsComponentForShare;
