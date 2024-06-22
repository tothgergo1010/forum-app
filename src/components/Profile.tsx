
import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../api';

interface ProfileProps {
    token: string;
}

const Profile: React.FC<ProfileProps> = ({ token }) => {
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getUserProfile(token);
                setProfile(response);
            } catch (error) {
                console.error('Failed to fetch profile', error);
            }
        };

        fetchProfile();
    }, [token]);

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Profile</h2>
            <p><strong>First Name:</strong> {profile.firstName}</p>
            <p><strong>Last Name:</strong> {profile.lastName}</p>
            <p><strong>Email:</strong> {profile.email}</p>
        </div>
    );
};

export default Profile;
