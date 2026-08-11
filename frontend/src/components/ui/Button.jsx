function Button({ children, variant = "primary", className = "", ...props }) {
  return (
    <button className={`sh-btn sh-btn--${variant} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}

export default Button;