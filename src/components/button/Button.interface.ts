import { ReactElement } from 'react';

export default interface ButtonProps {
  href: string;
  text: string;
  icon?: ReactElement;
  iconPosition?: 'left' | 'right';
}
