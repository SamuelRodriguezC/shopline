import React from "react";

interface Props {
  className: string;
  children: React.ReactNode;
  disabled?: boolean;
  handleClick?: () => void;
}

const Button = ({ className, children, disabled, handleClick }: Props) => {
  return <button disabled={disabled} className={className} onClick={handleClick} >{children}</button>;
};

export default Button;