import { useState, useEffect } from 'react';
import { fetchUsers } from '../../services';
import Header from '../Header';
import Hero from '../Hero';
import Users from '../Users';
import PostForm from '../PostForm';
import s from './App.module.scss';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [usersArray, setUsersArray] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const asyncFetch = async () => {
      try {
        const {
          data: { users, links },
        } = await fetchUsers(1);
        setUsersArray(users);
        setNextPage(links.next_url);
      } catch (error) {
        toast.error(`${error.response.data.message}`);
      }
      setIsLoading(false);
    };
    asyncFetch();
  }, [isSignupSuccess]);

  async function fetchNextPage() {
    setIsLoading(true);
    try {
      const response = await fetch(nextPage);
      const { users, links, page, total_pages } = await response.json();
      setUsersArray([...usersArray, ...users]);
      setNextPage(links.next_url);
      if (page === total_pages) setIsHidden(true);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
    setIsLoading(false);
  }

  const handleClick = () => {
    setIsLoading(true);
    fetchNextPage();
  };

  const onSuccessSubmit = () => {
    setIsSignupSuccess(true);
    setIsLoading(false);
  };

  return (
    <>
      <Header isPostForm={isSignupSuccess} />
      <Hero />
      {usersArray && (
        <Users
          users={usersArray}
          onClick={handleClick}
          isHidden={isHidden}
          isLoading={isLoading}
        />
      )}
      <PostForm
        onSubmitSuccess={onSuccessSubmit}
        setIsLoading={value => setIsLoading(value)}
        isDisabled={isLoading}
      />
      <ToastContainer />
      {isLoading && (
        <div className={s.spinner_wrapper}>
          <ClipLoader color="#00BDD3" size={48} />
        </div>
      )}
    </>
  );
}
