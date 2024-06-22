

import React from 'react';
import './Modal.css'; // Use the same modal styling

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Success</h2>
                <p>{message}</p>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
};

export default SuccessModal;
