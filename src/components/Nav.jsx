import useNavigate from "@hooks/useNavigate"
import useToken from "@hooks/useToken"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faGripVertical, faRightFromBracket, faRightToBracket, faFileLines, faUser } from '@fortawesome/free-solid-svg-icons';
import '@styles/App.css'

const Nav = () => {
    const { navigate} = useNavigate();
    const { isLoggedIn, decodedToken } = useToken();

    let rawToken = {}
    if (isLoggedIn) {
        rawToken = decodedToken()
    }


    return (
        <nav>
            <a href="#/" onClick={() => navigate('/')} className="nav-link">  <FontAwesomeIcon icon={faHouseChimney} className="fa-icon" /> HOME </a>
                    
            {
                isLoggedIn ? (
                    <>
                        <a href="#/admin" onClick={() => navigate('/admin')} className="nav-link"> <FontAwesomeIcon icon={faGripVertical} className="fa-icon" /> BLOG CRUD DASHBOARD</a> 
                        <a href="#/logout" onClick={() => navigate('/logout')} className="nav-link"> <FontAwesomeIcon icon={faRightFromBracket} className="fa-icon"/> LOGOUT</a>
                        <span className="nav-link"><FontAwesomeIcon icon={faUser} className="fa-icon" /> {rawToken.name}</span>
                    </>
                ) : (
                    <>
                    <a href="#/login" onClick={() => navigate('/login')} className="nav-link"> <FontAwesomeIcon icon={faRightToBracket} className="fa-icon" />LOGIN</a>
                    <a href="#/register" onClick={() => navigate('/register')} className="nav-link"> <FontAwesomeIcon icon={faFileLines} className="fa-icon" />REGISTER</a>
                    </>
                )
            }
        </nav>
    )
}

export default Nav