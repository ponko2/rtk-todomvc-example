import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { TodoFooter as Component } from "../../components/organisms/TodoFooter";
import {
  clearCompleted,
  selectCompletedTodosCount,
  selectTodosCount,
} from "../../modules/todos";

export function TodoFooter(): JSX.Element {
  const dispatch = useAppDispatch();
  const todosCount = useAppSelector(selectTodosCount);
  const completedCount = useAppSelector(selectCompletedTodosCount);
  return (
    <Component
      todosCount={todosCount}
      completedCount={completedCount}
      clearCompleted={() => {
        void dispatch(clearCompleted());
      }}
    ></Component>
  );
}
