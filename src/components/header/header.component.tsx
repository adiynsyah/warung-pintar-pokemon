import logo from '../../logo.svg';
import './header.component.scss';

export default function Header() { 
  return (
    <header className="header-container">
      <div className="header-inner">
        <img src={logo} className="logo" alt="logo" />
        <div className="logo-text">PokeDex</div>
      </div>
    </header>
  );
}