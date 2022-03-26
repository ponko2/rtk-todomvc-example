import React from "react";
import { TodoButton } from "../../components/atoms/TodoButton";
import { TodoLink } from "../../components/atoms/TodoLink";
import { VisibilityFilter } from "../../modules/visibilityFilter";
import styles from "./TodoFooter.module.css";

interface Props {
  filter: VisibilityFilter;
  setFilter: (value: VisibilityFilter) => void;
  todosCount: number;
  completedCount: number;
  clearCompleted: () => void;
}

export const TodoFooter: React.VFC<Props> = ({
  filter: nowFilter,
  setFilter,
  todosCount,
  completedCount,
  clearCompleted,
}) => {
  if (todosCount <= 0) {
    return null;
  }

  const activeCount = todosCount - completedCount;
  const itemWord = activeCount === 1 ? "item" : "items";

  const filters = {
    [VisibilityFilter.SHOW_ALL]: "All",
    [VisibilityFilter.SHOW_ACTIVE]: "Active",
    [VisibilityFilter.SHOW_COMPLETED]: "Completed",
  };

  return (
    <footer className={styles.footer}>
      <span className={styles.todoCount}>
        <strong>{activeCount || "No"}</strong> {itemWord} left
      </span>
      <ul className={styles.filters}>
        {(Object.keys(filters) as VisibilityFilter[]).map((filter) => (
          <li key={filter}>
            <TodoLink
              active={filter === nowFilter}
              onClick={() => setFilter(filter)}
            >
              {filters[filter]}
            </TodoLink>
          </li>
        ))}
      </ul>
      {!!completedCount && (
        <TodoButton className={styles.clearCompleted} onClick={clearCompleted}>
          Clear completed
        </TodoButton>
      )}
    </footer>
  );
};
