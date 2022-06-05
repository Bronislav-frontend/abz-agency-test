import s from './RadioButtons.module.scss';

export default function RadioButtons({ positions, onChange, error }) {
  return (
    <div className={s.position_wrapper}>
      {positions.map(({ id, name }) => (
        <label key={id} className={s.position_label}>
          <input
            type="radio"
            name="position_id"
            value={id}
            onChange={onChange}
            className={s.position_input}
          />
          <span className={s.position_name}>{name}</span>
        </label>
      ))}
      {error && <div className={s.error_msg}>{error}</div>}
    </div>
  );
}
