import classnames from "classnames";
import React from "react";
import styles from "./TodoButton.module.css";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const TodoButton = ({
  className,
  children,
  ...restProps
}: Props): JSX.Element => (
  <button className={classnames([styles.button, className])} {...restProps}>
    {children}
  </button>
);
