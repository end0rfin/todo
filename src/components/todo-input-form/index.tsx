import React, { useId, ChangeEvent, FormEvent } from "react";
import { useInput } from "../../hooks/useInput";
import { ActionTypes, useTodoContext } from "../../hooks/useTodoContext";
import { ArrowDown as ArrowDownIcon } from "../../assets/icons/arrow-down";
import "./styles.scss";

export const TodoInputForm = () => {
  const { state, dispatch } = useTodoContext();
  const newTodoId = useId();
  const { value, onBlur, error } = useInput("", false);
  const inputValue = state.newTodoValue || value;

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: ActionTypes.setNewTodo,
      payload: { newTodoValue: e.target.value },
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: ActionTypes.addNewTodo, payload: { newTodoId } });
  };

  return (
    <form className="todo-input-form" onSubmit={onSubmit}>
      <div className="todo-input-container">
        <ArrowDownIcon />
        <input
          className="todo-input"
          placeholder="Что должно быть сделано"
          value={inputValue}
          onChange={onInputChange}
          onBlur={onBlur}
        />
        {error && <span>{error}</span>}
      </div>
    </form>
  );
};
