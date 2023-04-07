import classnames from "classnames";
import type React from "react";
import styles from "./TodoButton.module.css";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function TodoButton({
  className,
  children,
  ...restProps
}: Props): JSX.Element {
  return (
    <button
      className={classnames([styles["button"], className])}
      {...restProps}
    >
      {children}
    </button>
  );
}
