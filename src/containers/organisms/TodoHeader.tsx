import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { TodoHeader as Component } from "../../components/organisms/TodoHeader";
import {
  addTodo,
  selectCompletedTodosCount,
  selectTodosCount,
  toggleAllTodo,
} from "../../modules/todos";

export function TodoHeader(): JSX.Element {
  const dispatch = useAppDispatch();
  const todosCount = useAppSelector(selectTodosCount);
  const completedCount = useAppSelector(selectCompletedTodosCount);
  return (
    <Component
      todosCount={todosCount}
      completedCount={completedCount}
      addTodo={(title) => {
        void dispatch(addTodo(title));
      }}
      toggleAllTodo={() => {
        void dispatch(toggleAllTodo());
      }}
    ></Component>
  );
}
