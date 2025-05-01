import User from '../models/User.js';
import Todo from '../models/Todo.js';

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password -otp');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

// Get user by username
export const getUserByUsername = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }, '-password -otp');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

// Update user
export const updateUser = async (req, res) => {
    try {
        const { username, email, role } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (username) user.username = username;
        if (email) user.email = email;
        if (role) user.role = role;

        await user.save();
        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete all todos associated with the user
        await Todo.deleteMany({ user: user._id });

        // Delete the user
        await user.deleteOne();

        res.json({ message: 'User and associated todos deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

// Get user's todos
export const getUserTodos = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const todos = await Todo.find({ user: user._id }).populate('user', 'username email -_id');
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos', error: error.message });
    }
};