import defaultProfilePhoto from '../../images/Vector.jpg';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import s from './Users.module.scss';

export default function Users({ users, onClick, isHidden, isLoading }) {
  return (
    <section id="users" className={s.section}>
      <h2 className={s.title}>Working with GET request</h2>
      <ul className={s.list}>
        {users &&
          users.map(user => (
            <li className={s.card} key={user.id}>
              <article className={s.article}>
                <img
                  src={user.photo ? user.photo : defaultProfilePhoto}
                  alt=""
                  className={s.img}
                  width="70px"
                  height="70px"
                  loading="lazy"
                />
                <Tippy content={user.name} placement="bottom">
                  <p className={s.name} data-tip={user.name}>
                    {user.name}
                  </p>
                </Tippy>
                <p className={s.text}>{user.position}</p>
                <Tippy content={user.email} placement="bottom">
                  <p data-tip={user.email} className={s.text}>
                    {user.email}
                  </p>
                </Tippy>
                <p>{user.phone}</p>
              </article>
            </li>
          ))}
      </ul>
      {!isHidden && (
        <button
          type="button"
          onClick={onClick}
          className={s.button}
          disabled={isLoading}
        >
          Show more
        </button>
      )}
    </section>
  );
}
