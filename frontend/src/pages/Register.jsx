import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PopupNotification from '../components/PopupNotification';
import '../styles/auth.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPopupMessage('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setPopupType('success');
        setPopupMessage('Registration successful! Welcome to ShopNest.');
        login(data);
        setTimeout(() => {
          setPopupMessage('');
          navigate('/');
        }, 1300);
      } else {
        setPopupType('error');
        setPopupMessage(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setPopupType('error');
      setPopupMessage('Unable to reach the server. Please check your backend connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <PopupNotification message={popupMessage} type={popupType} onClose={() => setPopupMessage('')} />
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Register</h2>
        <p className="auth-note">Create your free account and unlock the full ShopNest experience.</p>
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Register'}
        </button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
