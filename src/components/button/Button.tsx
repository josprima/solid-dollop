import Link from 'next/link';
import ButtonProps from './Button.interface';

function Button({ href, text, icon, iconPosition = 'left' }: ButtonProps) {
  return (
    <Link
      href={href}
      className="flex w-fit items-center text-blue-500 hover:text-blue-400 gap-2"
    >
      {iconPosition === 'left' && icon}

      <span>{text}</span>

      {iconPosition === 'right' && icon}
    </Link>
  );
}

export default Button;
