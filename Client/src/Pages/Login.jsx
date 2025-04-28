import AuthForm from '../Components/AuthForm';
import { loginUser } from '../api/auth';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom'; 

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    const { token } = await loginUser(email, password);
    login(token);
    navigate('/dashboard');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <AuthForm onSubmit={handleLogin} title="Login" />
      <p>Don't have an account?</p>
      <Link to="/register">
        <button style={{ marginTop: '10px' }}>Register</button>
      </Link>
    </div>
  );
};

export default Login;
