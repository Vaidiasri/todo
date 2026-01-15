const Todo = require('../models/Todo');

// @desc    Get all todos for the logged in user (Paginated)
// @route   GET /api/todos
// @access  Private
const getTodos = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const todos = await Todo.find({ user: req.user._id })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Todo.countDocuments({ user: req.user._id });

        res.json({
            todos,
            page,
            pages: Math.ceil(total / limit),
            total,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a new todo
// @route   POST /api/todos
// @access  Private
const createTodo = async (req, res) => {
    if (!req.body.title || !req.body.description) {
        return res.status(400).json({ message: 'Please add title and description' });
    }

    const todo = await Todo.create({
        title: req.body.title,
        description: req.body.description,
        user: req.user._id,
    });

    res.status(201).json(todo);
};

// @desc    Update a todo
// @route   PUT /api/todos/:id
// @access  Private
const updateTodo = async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    // Check for user
    if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
    }

    // Make sure the logged in user matches the todo user
    if (todo.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // Return new document
    );

    res.json(updatedTodo);
};

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
// @access  Private
const deleteTodo = async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    // Check for user
    if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
    }

    // Make sure the logged in user matches the todo user
    if (todo.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    await todo.deleteOne();

    res.json({ id: req.params.id });
};

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
};
