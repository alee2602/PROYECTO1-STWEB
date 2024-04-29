import useNavigate from '@hooks/useNavigate'
import Nav from '@components/Nav'
import Login from '@pages/Login'
import Home from '@pages/Home'
import Admin from '@pages/Admin'
import AddPost from '@pages/AddPost'
import UpdatePost from '@pages/UpdatePost'
import DeletePost from '@pages/DeletePost'
import Register from '@pages/Register'
import Logout from '@pages/Logout'
import useToken from '@hooks/useToken'
import '@styles/App.css'

const routes = {

    '/': {
        component: Home,
        isProtected: false
    },
    '/login': {
        component: Login,
        isProtected: false
    },
    '/admin': {
        component: Admin,
        isProtected: true
    },
    '/add-post':{
        component: AddPost,
        isProtected: true
    },
    '/update-post':{
        component: UpdatePost,
        isProtected: true
    },
    '/delete-post':{
        component: DeletePost,
        isProtected: true
    },
    '/logout': {
        component: Logout,
        isProtected: false 
    },
    '/register': {
        component: Register,
        isProtected: false
    }

}

function Router() {
    const { token } = useToken()
    const { page } = useNavigate()

    let CurrentPage = () => <h1>404 Page not found</h1>

    if (routes[page]){
        if (routes[page].isProtected && !token) {
            CurrentPage = Login
        } else {
            CurrentPage = routes[page].component
        }
    }

    if (page == "/logout") {
        window.location.replace("/");
    }

    return (
        <div>
            <Nav/>
            <CurrentPage/>
        </div>
    )
}

export default Router