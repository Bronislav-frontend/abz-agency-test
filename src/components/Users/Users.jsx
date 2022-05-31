import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../services';
import s from './Users.module.scss';

export default function Users() {
  const [usersArray, setUsersArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const asyncFetch = async () => {
      const {
        data: { total_pages, users, page },
      } = await fetchUsers(currentPage);
      setUsersArray([...usersArray, ...users]);
      if (currentPage === total_pages) {
        setIsHidden(true);
      }
    };
    asyncFetch();
  }, [currentPage]);

  const handleClick = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <section className={s.section}>
      <h2 className={s.title}>Working with GET request</h2>
      <ul className={s.list}>
        {usersArray &&
          usersArray.map(user => (
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
        <button type="button" onClick={handleClick} className={s.button}>
          Show more
        </button>
      )}
    </section>
  );
}
