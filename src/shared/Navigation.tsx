
import { useNavigate } from 'react-router';
import '../styles/index.css'
const Navigation = () => {
    const navigate = useNavigate()
    return (
        <div className="navigation-container">
            <button onClick={()=> navigate('/login') }> Login</button>
            <button onClick={()=> navigate('/register') }> Register</button>
        </div>
    );
};

export default Navigation;