import classnames from "classnames";
import React from "react";
import styles from "./TodoButton.module.css";

export const TodoButton: React.VFC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = ({ className, children, ...restProps }) => (
  <button className={classnames([styles.button, className])} {...restProps}>
    {children}
  </button>
);
