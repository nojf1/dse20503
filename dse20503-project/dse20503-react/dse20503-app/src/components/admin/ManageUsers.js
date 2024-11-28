import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService';
import '../../assets/styles/styles.css';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await UserService.getAllUsers();
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
                setMessage('Error fetching users');
            }
        };

        fetchUsers();
    }, []);

    const handleEditUser = (user) => {
        setSelectedUser(user);
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await UserService.updateUserProfile(selectedUser);
            setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
            setMessage('User updated successfully');
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleUpdateRole = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await UserService.updateUserRole(selectedUser);
            setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
            setMessage('Role updated successfully');
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await UserService.deleteUser(id);
            setUsers(users.filter(user => user.id !== id));
            setMessage('User deleted successfully');
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="admin-container">
            <h2>Admin Page</h2>
            {message && <p className="message">{message}</p>}
            <div className="user-list">
                <h3>Users</h3>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button onClick={() => handleEditUser(user)}>Edit</button>
                                    <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedUser && (
                <div className="user-edit">
                    <h3>Edit User</h3>
                    <form onSubmit={handleUpdateUser}>
                        <div className="form-group">
                            <label>Username:</label>
                            <input type="text" value={selectedUser.username} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" value={selectedUser.email} onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} required />
                        </div>
                        <div className="form-group">
                            <label>Phone Number:</label>
                            <input type="text" value={selectedUser.phoneNumber || ''} onChange={(e) => setSelectedUser({ ...selectedUser, phoneNumber: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Address:</label>
                            <input type="text" value={selectedUser.address || ''} onChange={(e) => setSelectedUser({ ...selectedUser, address: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>State:</label>
                            <input type="text" value={selectedUser.state || ''} onChange={(e) => setSelectedUser({ ...selectedUser, state: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Country:</label>
                            <input type="text" value={selectedUser.country || ''} onChange={(e) => setSelectedUser({ ...selectedUser, country: e.target.value })} />
                        </div>
                        <button className="btn" type="submit">Update User</button>
                    </form>
                    <form onSubmit={handleUpdateRole}>
                        <div className="form-group">
                            <label>Role:</label>
                            <select value={selectedUser.role} onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}>
                                <option value="ROLE_USER">User</option>
                                <option value="ROLE_ADMIN">Admin</option>
                            </select>
                        </div>
                        <button className="btn" type="submit">Update Role</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;