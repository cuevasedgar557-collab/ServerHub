import { useState } from "react";

function Field({ label, error, type, ...inputProps }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <label className="sh-field">
      <span className="sh-field__label">{label}</span>

      <div className={isPassword ? "sh-field__wrap" : undefined}>
        <input
          className={`sh-field__input${isPassword ? " sh-field__input--password" : ""}`}
          type={resolvedType}
          {...inputProps}
        />

        {isPassword && (
          <button
            type="button"
            className="sh-field__toggle"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3l18 18" />
                <path d="M10.58 10.58a3 3 0 0 0 4.24 4.24" />
                <path d="M9.88 5.09A10.7 10.7 0 0 1 12 5c6.5 0 10 7 10 7a13.4 13.4 0 0 1-3.17 4.13M6.6 6.6C4.08 8.24 2 12 2 12s3.5 7 10 7c1.36 0 2.59-.3 3.68-.79" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>

      {error && <span className="sh-field__error">{error}</span>}
    </label>
  );
}

export default Field;