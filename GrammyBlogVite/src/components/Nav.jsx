import useNavigate from "@hooks/useNavigate"
import useToken from "@hooks/useToken"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faGripVertical, faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
    const { navigate} = useNavigate();
    const { isLoggedIn, decodedToken } = useToken();

    //let rawToken = {}
    //if (isLoggedIn) {
        // = (decodedToken)
        //console.log(decodedToken)
    //}


    return (
        <nav>
            <a href="#/" onClick={() => navigate('/')} className="nav-link">  <FontAwesomeIcon icon={faHouseChimney} className="fa-icon" /> INICIO </a>
                    
            {
                isLoggedIn ? (
                    <>
                        <a href="#/admin" onClick={() => navigate('/admin')} className="nav-link"> <FontAwesomeIcon icon={faGripVertical} className="fa-icon" /> BLOG DASHBOARD</a> 
                        <a href="#/logout" onClick={() => navigate('/logout')} className="nav-link"> <FontAwesomeIcon icon={faRightFromBracket} className="fa-icon"/> LOGOUT</a>
                    </>
                ) : (
                    <a href="#/login" onClick={() => navigate('/login')} className="nav-link"> <FontAwesomeIcon icon={faRightToBracket} className="fa-icon" />LOGIN</a>
                )
            }
        </nav>
    )
}

export default Nav