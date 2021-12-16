import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import classnames from 'classnames';
import styles from './TodoButton.module.css';

export const TodoButton: React.VFC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = (props) => {
  const { className, children, ...restProps } = props;
  return (
    <button className={classnames([styles.button, className])} {...restProps}>
      {children}
    </button>
  );
};
