import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { TodoFooter as Component } from "../../components/organisms/TodoFooter";
import {
  clearCompleted,
  selectCompletedTodosCount,
  selectTodosCount,
} from "../../modules/todos";

export const TodoFooter: React.VFC = () => {
  const dispatch = useAppDispatch();
  const todosCount = useAppSelector((state) => selectTodosCount(state));
  const completedCount = useAppSelector((state) =>
    selectCompletedTodosCount(state)
  );
  return (
    <Component
      todosCount={todosCount}
      completedCount={completedCount}
      clearCompleted={() => {
        dispatch(clearCompleted());
      }}
    ></Component>
  );
};
