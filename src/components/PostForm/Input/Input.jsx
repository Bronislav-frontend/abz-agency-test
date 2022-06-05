import s from './Input.module.scss';

export default function Input({ name, onChange, value, error, labelText }) {
  return (
    <div className={s.input_wrapper}>
      <input
        id={name}
        name={name}
        type="text"
        onChange={onChange}
        value={value}
        autoComplete="off"
        className={error ? s.input_invalid : s.input}
      />
      <label htmlFor={name} className={s.custom_placeholder}>
        {labelText}
      </label>
      {error && <div className={s.error_msg}>{error}</div>}
    </div>
  );
}
