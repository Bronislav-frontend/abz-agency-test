import { useState, useEffect } from 'react';
import { fetchUsers } from '../../services';
import { toast } from 'react-toastify';
import Header from '../Header';
import Hero from '../Hero';
import Users from '../Users';
import PostForm from '../PostForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [usersArray, setUsersArray] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const [isHidden, setIsHidden] = useState(false);
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

  useEffect(() => {
    const asyncFetch = async () => {
      const {
        data: { users, links },
      } = await fetchUsers(1);
      setUsersArray(users);
      setNextPage(links.next_url);
    };
    asyncFetch();
  }, [isSignupSuccess]);

  async function fetchNextPage() {
    try {
      const response = await fetch(nextPage);
      const { users, links, page, total_pages } = await response.json();
      setUsersArray([...usersArray, ...users]);
      setNextPage(links.next_url);
      if (page === total_pages) setIsHidden(true);
    } catch (error) {
      return toast.warning(`Ooops, something went wrong:${error}`);
    }
  }

  const handleClick = () => {
    fetchNextPage();
  };

  const onSuccessSubmit = () => {
    setIsSignupSuccess(true);
  };

  return (
    <>
      <Header isPostForm={isSignupSuccess} />
      <Hero />
      {usersArray && (
        <Users users={usersArray} onClick={handleClick} isHidden={isHidden} />
      )}
      <PostForm onSubmit={onSuccessSubmit} />
      <ToastContainer />
    </>
  );
}
