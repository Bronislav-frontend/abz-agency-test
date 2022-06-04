import s from './Users.module.scss';

export default function Users({ users, onClick, isHidden }) {
  return (
    <section id="users" className={s.section}>
      <h2 className={s.title}>Working with GET request</h2>
      <ul className={s.list}>
        {users &&
          users.map(user => (
            <li className={s.card} key={user.id}>
              <article>
                <img src={user.photo} alt="" className={s.img} />
                <p className={s.name}>{user.name}</p>
                <p>{user.position}</p>
                <p>{user.email}</p>
                <p>{user.phone}</p>
              </article>
            </li>
          ))}
      </ul>
      {!isHidden && (
        <button type="button" onClick={onClick} className={s.button}>
          Show more
        </button>
      )}
    </section>
  );
}
