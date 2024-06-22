

import React, { useState } from 'react';
import { searchForums } from '../api';
import ForumDetailModal from './ForumDetailModal';
import './SearchForum.css';

interface SearchForumProps {
    token: string;
}

const SearchForum: React.FC<SearchForumProps> = ({ token }) => {
    const [query, setQuery] = useState('');
    const [after, setAfter] = useState('');
    const [before, setBefore] = useState('');
    const [usersOnly, setUsersOnly] = useState(false);
    const [usersFirst, setUsersFirst] = useState(false);
    const [orderBy, setOrderBy] = useState('date.DESC');
    const [forums, setForums] = useState<any[]>([]);
    const [selectedForum, setSelectedForum] = useState<any>(null);
    const [error, setError] = useState('');

    const handleSearch = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const params = {
                query,
                after,
                before,
                usersOnly,
                usersFirst,
                orderBy
            };
            const results = await searchForums(params, token);
            setForums(results);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleForumClick = (forum: any) => {
        setSelectedForum(forum);
    };

    const handleCloseModal = () => {
        setSelectedForum(null);
    };

    return (
        <div>
            <form onSubmit={handleSearch} className="search-form">
                <h2>Search Forums</h2>
                {error && <p>{error}</p>}
                <div>
                    <label>Search by description name:</label>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <div>
                    <label>After:</label>
                    <input
                        type="datetime-local"
                        value={after}
                        onChange={(e) => setAfter(e.target.value)}
                    />
                </div>
                <div>
                    <label>Before:</label>
                    <input
                        type="datetime-local"
                        value={before}
                        onChange={(e) => setBefore(e.target.value)}
                    />
                </div>
                <div>
                    <label>Users Only:</label>
                    <input
                        type="checkbox"
                        checked={usersOnly}
                        onChange={(e) => setUsersOnly(e.target.checked)}
                    />
                </div>
                <div>
                    <label>Users First:</label>
                    <input
                        type="checkbox"
                        checked={usersFirst}
                        onChange={(e) => setUsersFirst(e.target.checked)}
                    />
                </div>
                <div>
                    <label>Order By:</label>
                    <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
                        <option value="date.ASC">Date ASC</option>
                        <option value="date.DESC">Date DESC</option>
                        <option value="name.ASC">Name ASC</option>
                        <option value="name.ESC">Name DESC</option>
                    </select>
                </div>
                <button type="submit">Search</button>
            </form>
            <div className="forum-list">
                {forums.map((forum: any) => (
                    <div key={forum.id} className="forum-item" onClick={() => handleForumClick(forum)}>
                        <h3>{forum.title}</h3>
                        <p>{forum.description}</p>
                    </div>
                ))}
            </div>
            {selectedForum && (
                <ForumDetailModal forum={selectedForum} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default SearchForum;
