import Todo from '../models/Todo.js';

// Get all todos for the logged-in user
export const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user._id });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos', error: error.message });
    }
};

// Create a new todo
export const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;

        const todo = new Todo({
            title,
            description,
            user: req.user._id
        });

        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Error creating todo', error: error.message });
    }
};

// Update a todo
export const updateTodo = async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found or unauthorized' });
        }

        if (title) todo.title = title;
        if (description !== undefined) todo.description = description;
        if (completed !== undefined) todo.completed = completed;

        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Error updating todo', error: error.message });
    }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ 
            _id: req.params.id, 
            user: req.user._id 
        });

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found or unauthorized' });
        }

        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting todo', error: error.message });
    }
};

// Get a specific todo
export const getTodo = async (req, res) => {
    try {
        const todo = await Todo.findOne({ 
            _id: req.params.id, 
            user: req.user._id 
        });

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found or unauthorized' });
        }

        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todo', error: error.message });
    }
};