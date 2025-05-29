const Toggle = ({ value, onChange, name }) => {
  return (
    <div className="toggle-container">
      <label className="toggle-switch">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="toggle-switch__input" />
        <span className="toggle-switch__slider"></span>
      </label>
      <span className="toggle-switch__label">{name}</span>
    </div>
  );
};

export default Toggle;
