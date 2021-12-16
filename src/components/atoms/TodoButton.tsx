import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import classnames from 'classnames';
import styles from './TodoButton.module.css';

export const TodoButton: React.VFC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ className, children, ...restProps }) => {
  return (
    <button className={classnames([styles.button, className])} {...restProps}>
      {children}
    </button>
  );
};
