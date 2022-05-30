import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../services';
import './Users.scss';

export default function Users() {
  const [usersArray, setUsersArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const asyncFetch = async () => {
      const {
        data: { total_pages, users },
      } = await fetchUsers(currentPage);
      setUsersArray([...usersArray, ...users]);
      // setUsersArray(users);
      if (currentPage === total_pages) {
        setIsHidden(true);
      }
    };
    asyncFetch();
  }, [currentPage]);

  console.log(isHidden);

  const handleClick = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <section className="users-section">
      <h2>Working with GET request</h2>
      <ul className="users_list">
        {usersArray &&
          usersArray.map(user => (
            <li key={user.id}>
              <article>
                <img src={user.photo} alt="" />
                <p>{user.name}</p>
                <p>{user.position}</p>
                <p>{user.email}</p>
                <p>{user.phone}</p>
              </article>
            </li>
          ))}
      </ul>
      {!isHidden && (
        <button type="button" onClick={handleClick}>
          Show more
        </button>
      )}
    </section>
  );
}
