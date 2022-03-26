import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/rootReducer";
import { TodoHeader as Component } from "../../components/organisms/TodoHeader";
import { addTodo, toggleAllTodo } from "../../modules/todos";
import { getCompletedTodoCount, getTodosCount } from "../../selectors/todos";

export const TodoHeader: React.VFC = () => {
  const dispatch = useDispatch();
  const todosCount = useSelector<RootState, number>((state) =>
    getTodosCount(state)
  );
  const completedCount = useSelector<RootState, number>((state) =>
    getCompletedTodoCount(state)
  );
  return (
    <Component
      todosCount={todosCount}
      completedCount={completedCount}
      addTodo={(text) => {
        dispatch(addTodo(text));
      }}
      toggleAllTodo={() => {
        dispatch(toggleAllTodo());
      }}
    ></Component>
  );
};
