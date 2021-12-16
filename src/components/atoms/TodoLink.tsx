import React, { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';
import classnames from 'classnames';
import styles from './TodoLink.module.css';

interface Props
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  active?: boolean;
}

export const TodoLink: React.VFC<Props> = ({
  active,
  children,
  className,
  style,
  ...restProps
}) => {
  const classNames = [styles.link, className];
  if (active) {
    classNames.push(styles.selected);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      className={classnames(classNames)}
      style={{ cursor: 'pointer', ...style }}
      {...restProps}
    >
      {children}
    </a>
  );
};
