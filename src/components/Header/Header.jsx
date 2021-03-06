import logoSvg from '../../images/logo.svg';
import s from './Header.module.scss';
import { Link } from 'react-scroll';

export default function Header() {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <a href="/">
          <img src={logoSvg} alt="logo" width="104px" height="26px" />
        </a>
        <ul className={s.nav_links_list}>
          <li className={s.nav_link_item}>
            <Link className={s.link} to="users" smooth={true} duration={750}>
              Users
            </Link>
          </li>
          <li className={s.nav_links_item}>
            <Link
              className={s.link}
              to="post_form"
              smooth={true}
              duration={750}
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
