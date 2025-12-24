//Dependencies import
import type { ReactNode, MouseEventHandler } from "react";

//Button props
type ButtonProps = {
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

//Button component
const Button = ({className="", type="button", onClick, children}: ButtonProps) => {
    return(
        <button type={type} onClick={onClick} className={`px-4 py-2 transition-colors ${className}`}>
            {children}
        </button>
    )
}

export default Button;