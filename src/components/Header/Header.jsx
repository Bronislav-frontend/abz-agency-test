import logoSvg from '../../images/logo.svg';
import './Header.scss';

export default function Header() {
  function onclick(number) {
    window.scrollTo({
      behavior: 'smooth',
      bottom: number,
    });
  }

  return (
    <header className="header">
      <img src={logoSvg} alt="logo" />
      <ul className="nav-buttons-list">
        <li className='nav-buttons-item'>
          <button className="button" onClick={onclick()}>
            Users
          </button>
        </li>
        <li className='nav-buttons-item'>
          <button className="button" onClick={onclick()}>
            Sign Up
          </button>
        </li>
      </ul>
    </header>
  );
}
