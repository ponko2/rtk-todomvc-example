import { Link } from "@tanstack/react-location";
import { TodoButton } from "../../components/atoms/TodoButton";
import styles from "./TodoFooter.module.css";

type Props = {
  todosCount: number;
  completedCount: number;
  clearCompleted: () => void;
};

function getActiveProps() {
  return { className: [styles.selected] };
}

export const TodoFooter = ({
  todosCount,
  completedCount,
  clearCompleted,
}: Props): JSX.Element | null => {
  if (todosCount <= 0) {
    return null;
  }

  const activeCount = todosCount - completedCount;

  return (
    <footer className={styles.footer}>
      <span className={styles.todoCount}>
        <strong>{activeCount ?? "No"}</strong>{" "}
        {activeCount === 1 ? "item" : "items"} left
      </span>
      <ul className={styles.filters}>
        <li>
          <Link to="/" className={styles.link} getActiveProps={getActiveProps}>
            All
          </Link>
        </li>
        <li>
          <Link
            to="active"
            className={styles.link}
            getActiveProps={getActiveProps}
          >
            Active
          </Link>
        </li>
        <li>
          <Link
            to="completed"
            className={styles.link}
            getActiveProps={getActiveProps}
          >
            Completed
          </Link>
        </li>
      </ul>
      {!!completedCount && (
        <TodoButton className={styles.clearCompleted} onClick={clearCompleted}>
          Clear completed
        </TodoButton>
      )}
    </footer>
  );
};
