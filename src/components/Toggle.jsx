const Toggle = ({ value, onChange, name }) => {
  const handleChange = (e) => {
    onChange(e.target.checked);
  };

  return (
    <div className="toggle-container">
      <label className="toggle-switch">
        <input type="checkbox" checked={value} onChange={handleChange} className="toggle-switch__input" />
        <span className="toggle-switch__slider"></span>
      </label>
      <span className="toggle-switch__label">{name}</span>
    </div>
  );
};

export default Toggle;
