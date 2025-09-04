// src/components/UI/Button.jsx
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  type = 'button',
  disabled = false 
}) => {
  const classNames = `btn btn-${variant} btn-${size} ${disabled ? 'disabled' : ''}`
  
  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button