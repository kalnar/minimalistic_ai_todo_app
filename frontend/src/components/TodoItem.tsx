import React from 'react';
import { Todo } from '../types/Todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <h3>{todo.title}</h3>
        {todo.description && <p>{todo.description}</p>}
      </div>
      <div className="todo-actions">
        <button
          onClick={() => todo.id && onToggle(todo.id)}
          className={`toggle-btn ${todo.completed ? 'completed' : ''}`}
        >
          {todo.completed ? '✓' : '○'}
        </button>
        <button
          onClick={() => todo.id && onDelete(todo.id)}
          className="delete-btn"
        >
          ✕
        </button>
      </div>
    </div>
  );
};