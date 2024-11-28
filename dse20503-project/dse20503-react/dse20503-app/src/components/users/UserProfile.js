import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService';
import '../../assets/styles/styles.css';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userData = await UserService.getUserProfile();
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setMessage('Error fetching user profile');
            }
        };

        fetchUserProfile();
    }, []);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await UserService.updateUserProfile(user);
            setUser(updatedUser);
            setMessage('Profile updated successfully');
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            await UserService.changePassword({ userId: user.id, oldPassword, newPassword });
            setMessage('Password changed successfully');
            setOldPassword('');
            setNewPassword('');
        } catch (error) {
            setMessage(error.message);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            <form onSubmit={handleUpdateProfile}>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" value={user.username} readOnly />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input type="text" value={user.phoneNumber} onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input type="text" value={user.address} onChange={(e) => setUser({ ...user, address: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>State:</label>
                    <input type="text" value={user.state} onChange={(e) => setUser({ ...user, state: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Country:</label>
                    <input type="text" value={user.country} onChange={(e) => setUser({ ...user, country: e.target.value })} />
                </div>
                <button className="btn" type="submit">Update Profile</button>
            </form>

            <h2>Change Password</h2>
            <form onSubmit={handleChangePassword}>
                <div className="form-group">
                    <label>Old Password:</label>
                    <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>New Password:</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                </div>
                <button className="btn" type="submit">Change Password</button>
            </form>

            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default UserProfile;