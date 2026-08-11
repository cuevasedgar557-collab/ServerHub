function Field({ label, error, ...inputProps }) {
  return (
    <label className="sh-field">
      <span className="sh-field__label">{label}</span>
      <input className="sh-field__input" {...inputProps} />
      {error && <span className="sh-field__error">{error}</span>}
    </label>
  );
}

export default Field;