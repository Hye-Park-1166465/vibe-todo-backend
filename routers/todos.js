const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// 1. 모든 TODO 가져오기 (GET /todos)
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. TODO 추가하기 (POST /todos)
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: '제목은 필수입니다.' });
    }
    
    const todo = new Todo({
      title,
      description: description || ''
    });
    
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. 특정 TODO 가져오기 (GET /todos/:id)
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ error: 'TODO를 찾을 수 없습니다.' });
    }
    
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. TODO 수정하기 (PUT /todos/:id)
router.put('/:id', async (req, res) => {
  try {
    const { title, description } = req.body;
    
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ error: 'TODO를 찾을 수 없습니다.' });
    }
    
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    todo.updatedAt = Date.now();
    
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. TODO 삭제하기 (DELETE /todos/:id)
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ error: 'TODO를 찾을 수 없습니다.' });
    }
    
    res.json({ message: 'TODO가 삭제되었습니다.', todo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

