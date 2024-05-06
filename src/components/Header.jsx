import logo from '@assets/logo.png'
import '@styles/App.css';

function Header(props) {
    return(
        <header>
        <div className="header-content">
            <img src={logo} alt="Logo" className="logo" />
            <hr className="vertical-line" />
            <h1>GRAMMYS BLOG</h1>
        </div>
    </header>
    )
}
export default Header