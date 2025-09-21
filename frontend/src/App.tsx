import React, { useState, useEffect } from 'react';
import './App.css';
import { Todo } from './types/Todo';
import { todoService } from './services/todoService';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const fetchedTodos = await todoService.getAllTodos();
      setTodos(fetchedTodos);
      setError(null);
    } catch (err) {
      setError('Failed to load todos. Make sure the backend is running on port 8080.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (newTodo: Omit<Todo, 'id'>) => {
    try {
      const createdTodo = await todoService.createTodo(newTodo);
      setTodos([...todos, createdTodo]);
      setError(null);
    } catch (err) {
      setError('Failed to add todo');
    }
  };

  const handleToggleTodo = async (id: number) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (todo) {
        const updatedTodo = await todoService.updateTodo(id, {
          ...todo,
          completed: !todo.completed
        });
        setTodos(todos.map(t => t.id === id ? updatedTodo : t));
        setError(null);
      }
    } catch (err) {
      setError('Failed to update todo');
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter(t => t.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete todo');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App</h1>
      </header>
      <main className="App-main">
        {error && <div className="error-message">{error}</div>}
        <TodoForm onSubmit={handleAddTodo} />
        {loading ? (
          <div className="loading">Loading todos...</div>
        ) : (
          <TodoList
            todos={todos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        )}
      </main>
    </div>
  );
}

export default App;
