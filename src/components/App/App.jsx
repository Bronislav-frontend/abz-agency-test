import Header from '../Header';
import Hero from '../Hero';
import Users from '../Users';
import PostForm from '../PostForm';
import s from './App.module.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <div className={s.container}>
      <Header />
      <Hero />
      <Users />
      <PostForm />
      <ToastContainer />
    </div>
  );
}
