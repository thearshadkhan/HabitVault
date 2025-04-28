import AuthForm from '../Components/AuthForm';
import { registerUser } from '../api/auth';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom'; // 👈 import Link

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (email, password) => {
    const { token } = await registerUser(email, password);
    login(token);
    navigate('/dashboard');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <AuthForm onSubmit={handleRegister} title="Register" />
      <p>
        Already have an account?{' '}
        <Link to="/login">Login</Link> {/* 👈 clickable link to login */}
      </p>
    </div>
  );
};

export default Register;
