import React, { useState } from 'react';
import './Users.scss';

export default function Users() {
  const [page, setPage] = useState(1);
  const [hidden, setHidden] = useState(false);
  const { data, isLoading, error } = useGetUsersQuery(page);

  // need to fix the thing with button show

  const handleClick = () => {
    if (data.total_pages === page) {
      setHidden(true);
    } else {
      setPage(page + 1);
    }
  };

  // need to fix the thing with button show

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Oooops, something went wrong</h2>;

  return (
    <section className="users-section">
      <h2>Working with GET request</h2>
      <ul className="users_list">
        {data.users.map(user => (
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
      <button type="button" onClick={handleClick} hidden={hidden}>
        Show more
      </button>
    </section>
  );
}
