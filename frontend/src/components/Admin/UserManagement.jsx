import React, { useState } from 'react';

const UserManagement = () => {
  const users = [
    {
      _id: 5646546,
      name: 'Almoe Kima',
      email: 'almoe@out.com',
      role: 'admin',
    },
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer', //Default role
  });
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    // Reset the form to it's initial state
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'customer',
    });
  };
  const handleRoleChange = (userId, newRole) => {
    console.log({
      id: userId,
      role: newRole,
    });
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want  to delete this user ?')) {
      console.log('Deleting user with success', userId);
    }
  };

  console.log(formData);
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">User management</h2>

      {/* Add new user */}

      <div className="p-6 rounded-lg mb-6">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600  ">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600  ">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600  ">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600  ">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-400 text-gray-200 px-4 py-2  rounded hover:bg-green-300"
          >
            Add User
          </button>
        </form>
      </div>
      {/* User list management */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="text-left text-gray-500 min-w-full">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b border-gray-300 hover:bg-gray-50"
              >
                <td className="font-medium p-4 text-gray-900 whitespace-nowrap">
                  {user.email}
                </td>
                <td className="font-medium p-4 text-gray-900 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="font-medium p-4 text-gray-900 whitespace-nowrap">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="font-medium p-4 text-gray-900 whitespace-nowrap">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 text-gray-200 px-4 py-2 rounded hover:bg-red-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
