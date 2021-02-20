import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FunctionComponent,
} from 'react';
import classnames from 'classnames';
import styles from './TodoButton.module.css';

export const TodoButton: FunctionComponent<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = (props) => {
  const { className, children, ...restProps } = props;
  return (
    <button className={classnames([styles.button, className])} {...restProps}>
      {children}
    </button>
  );
};
