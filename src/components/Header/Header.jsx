import logoSvg from '../../images/logo.svg';
import s from './Header.module.scss';

export default function Header() {
  function onclick(number) {
    window.scrollTo({
      behavior: 'smooth',
      bottom: number,
    });
  }

  return (
    <header className={s.header}>
      <div className={s.container}>
        <img src={logoSvg} alt="logo" />
        <ul className={s.nav_buttons_list}>
          <li className={s.nav_buttons_item}>
            <button className={s.button} onClick={onclick()}>
              Users
            </button>
          </li>
          <li className={s.nav_buttons_item}>
            <button className={s.button} onClick={onclick()}>
              Sign Up
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
