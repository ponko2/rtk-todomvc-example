import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { TodoHeader as Component } from "../../components/organisms/TodoHeader";
import {
  addTodo,
  selectCompletedTodosCount,
  selectTodosCount,
  toggleAllTodo,
} from "../../modules/todos";

export const TodoHeader: React.VFC = () => {
  const dispatch = useAppDispatch();
  const todosCount = useAppSelector((state) => selectTodosCount(state));
  const completedCount = useAppSelector((state) =>
    selectCompletedTodosCount(state)
  );
  return (
    <Component
      todosCount={todosCount}
      completedCount={completedCount}
      addTodo={(title) => {
        dispatch(addTodo(title));
      }}
      toggleAllTodo={() => {
        dispatch(toggleAllTodo());
      }}
    ></Component>
  );
};
