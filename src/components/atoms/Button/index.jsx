import React from "react";

const Button = ({variant, label, children, ...rest}) => {
  const themes = {
    outlinePrimary:
      "border border-blue-600 py-[10px] px-14 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 text-blue-600",
    primary:
      "py-[10px] px-14 rounded-full font-semibold bg-blue-600 hover:bg-blue-800 text-white transition-all duration-300",
  };
  const theme = themes[variant];

  return (
    <div>
      <button className={theme} {...rest}>
        {label ? label : children}
      </button>
    </div>
  );
};

export default Button;
