import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Login from '../page/login'
import NotFound from '../page/notFound'
import Register from '../page/register'
const routes = createBrowserRouter([
    {
        path:'/',
        element: <App/>
    },
    
    {
        path:'/login',
        element: <Login/>
    },
    {
        path:'/register',
        element: <Register/>
    },
    {
        path:'*',
        element: <NotFound/>
    },
])

export default routes