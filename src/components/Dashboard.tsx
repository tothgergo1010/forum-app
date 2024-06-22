

import React, { useState } from 'react';
import Modal from './Modal';
import CreateForum from './CreateForum';
import SearchForum from './SearchForum';

interface DashboardProps {
    userProfile: {
        firstName: string;
        lastName: string;
    };
    onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userProfile, onLogout }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = localStorage.getItem('token')!;

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <h1>Welcome to your dashboard</h1>
            <button onClick={handleOpenModal}>Create Forum Thread</button>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <CreateForum onClose={handleCloseModal} token={token} />
            </Modal>
            <SearchForum token={token} />
        </div>
    );
};

export default Dashboard;
