

import React from 'react';
import './Modal.css';

interface ForumDetailModalProps {
    forum: any;
    onClose: () => void;
}

const ForumDetailModal: React.FC<ForumDetailModalProps> = ({ forum, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                <h2>{forum.title}</h2>
                <p>{forum.description}</p>
                <p>Created At: {new Date(forum.createdAt).toLocaleString()}</p>
                <p>Created By: {forum.createdBy.firstName} {forum.createdBy.lastName}</p>
                {forum.lastComment && (
                    <>
                        <h3>Last Comment</h3>
                        <p>{forum.lastComment.message}</p>
                        <p>By: {forum.lastComment.user.firstName} {forum.lastComment.user.lastName}</p>
                        <p>At: {new Date(forum.lastComment.createdAt).toLocaleString()}</p>
                    </>
                )}
                <p>Comments Count: {forum.commentsCount}</p>
                <button onClick={onClose} className="close-btn">Close</button>
            </div>
        </div>
    );
};

export default ForumDetailModal;
