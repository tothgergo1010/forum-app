
import React, { useState } from 'react';
import { createForum } from '../api';
import SuccessModal from './SuccessModal';

interface CreateForumProps {
    onClose: () => void;
    token: string;
}

const CreateForum: React.FC<CreateForumProps> = ({ onClose, token }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!title || title.length > 100) {
            setError('Title is required and must be less than 100 characters');
            return;
        }
        if (!description || description.length > 250) {
            setError('Description is required and must be less than 250 characters');
            return;
        }

        try {
            const response = await createForum({ title, description }, token);
            console.log('Forum creation response:', response); // Log the response
            if (response.success) {
                // Show success modal
                setIsSuccessModalOpen(true);
            } else {
                setError(response.message || 'Failed to create forum');
            }
        } catch (err) {
            setError('An error occurred');
        }
    };

    const handleSuccessModalClose = () => {
        setIsSuccessModalOpen(false);
        onClose();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Create Forum</h2>
                {error && <p>{error}</p>}
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={100}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={250}
                    />
                </div>
                <button type="submit">Create</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
            <SuccessModal 
                isOpen={isSuccessModalOpen} 
                onClose={handleSuccessModalClose} 
                message="Forum thread created successfully!" 
            />
        </div>
    );
};

export default CreateForum;
