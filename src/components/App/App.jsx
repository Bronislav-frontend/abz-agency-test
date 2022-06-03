import Header from '../Header';
import Hero from '../Hero';
import Users from '../Users';
import PostForm from '../PostForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <Users />
      <PostForm />
      <ToastContainer />
    </>
  );
}
