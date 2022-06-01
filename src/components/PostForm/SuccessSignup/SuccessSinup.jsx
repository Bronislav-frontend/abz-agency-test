import svg from '../../../images/success.svg';
import s from './SuccessSignup.module.scss';

export default function SuccessSinup() {
  return (
    <>
      <section className={s.section}>
        <h2 className={s.title}>User successfully registered</h2>
        <img src={svg} alt="" />
      </section>
      <footer className={s.footer}>
        <p>© abz.agency specially for the test task</p>
      </footer>
    </>
  );
}
