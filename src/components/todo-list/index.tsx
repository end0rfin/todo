import React, { useEffect, useState } from "react";
import {
  ActionTypes,
  TodoStates,
  useTodoContext,
} from "../../hooks/useTodoContext";
import { Accept as AcceptIcon } from "../../assets/icons/accept";
import "./styles.scss";

export const TodoList = () => {
  const {
    state: { todoList },
    dispatch,
  } = useTodoContext();
  const [filteredTodoList, setFilteredTodoList] = useState([]);

  useEffect(() => setFilteredTodoList(todoList), [todoList]);

  const handleToggleStateClick = (todoId: number) =>
    dispatch({
      type: ActionTypes.toggleTodoState,
      payload: { updateTodoId: todoId },
    });

  const handleRemoveTodoClick = (todoId: number) =>
    dispatch({
      type: ActionTypes.removeTodo,
      payload: { updateTodoId: todoId },
    });

  const toggleTodoStateButton = (todoId: number, todoState: TodoStates) => {
    return (
      <button
        className={`toggle-todo-state-button ${todoState}`}
        onClick={() => handleToggleStateClick(todoId)}
      >
        {todoState === TodoStates.ACTIVE ? null : <AcceptIcon />}
      </button>
    );
  };

  return (
    <div className="todo-list">
      {filteredTodoList.map((todo) => (
        <div key={`${todo.id}`} className="todo-list-item">
          {toggleTodoStateButton(todo.id, todo.state)}
          {todo.value}
          <button
            onClick={() => handleRemoveTodoClick(todo.id)}
            className="remove-todo-item"
          >
            удалить
          </button>
        </div>
      ))}
    </div>
  );
};
