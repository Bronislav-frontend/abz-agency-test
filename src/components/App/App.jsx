import { useState, useEffect } from 'react';
import { fetchUsers } from '../../services';
import Header from '../Header';
import Hero from '../Hero';
import Users from '../Users';
import PostForm from '../PostForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [usersArray, setUsersArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isHidden, setIsHidden] = useState(false);
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

  useEffect(() => {
    const asyncFetch = async () => {
      const {
        data: { total_pages, users },
      } = await fetchUsers(currentPage);
      setUsersArray([...usersArray, ...users]);
      if (currentPage === total_pages) {
        setIsHidden(true);
      }
    };
    asyncFetch();
  }, [currentPage, isSignupSuccess]);

  const handleClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const onSuccessSubmit = () => {
    setIsSignupSuccess(true);
  };

  return (
    <>
      <Header />
      <Hero />
      {usersArray && (
        <Users users={usersArray} onClick={handleClick} isHidden={isHidden} />
      )}
      <PostForm onSubmit={onSuccessSubmit} />
      <ToastContainer />
    </>
  );
}
