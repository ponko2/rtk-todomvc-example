import { Link } from "@tanstack/react-router";
import { TodoButton } from "../../components/atoms/TodoButton";
import styles from "./TodoFooter.module.css";

type Props = {
  todosCount: number;
  completedCount: number;
  clearCompleted: () => void;
};

function activeProps() {
  return { className: styles["selected"] };
}

export function TodoFooter({
  todosCount,
  completedCount,
  clearCompleted,
}: Props): JSX.Element | null {
  if (todosCount <= 0) {
    return null;
  }

  const activeCount = todosCount - completedCount;

  return (
    <footer className={styles["footer"]}>
      <span className={styles["todoCount"]}>
        <strong>{activeCount ?? "No"}</strong>{" "}
        {activeCount === 1 ? "item" : "items"} left
      </span>
      <ul className={styles["filters"]}>
        <li>
          <Link to="/" className={styles["link"]} activeProps={activeProps}>
            All
          </Link>
        </li>
        <li>
          <Link
            to="/active"
            className={styles["link"]}
            activeProps={activeProps}
          >
            Active
          </Link>
        </li>
        <li>
          <Link
            to="/completed"
            className={styles["link"]}
            activeProps={activeProps}
          >
            Completed
          </Link>
        </li>
      </ul>
      {!!completedCount && (
        <TodoButton
          className={styles["clearCompleted"]}
          onClick={clearCompleted}
        >
          Clear completed
        </TodoButton>
      )}
    </footer>
  );
}
