import React, { useState } from 'react';

function App() {
  const [formType, setFormType] = useState('login'); // "login" or "signup"
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Handles user input for email/password fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  // Signup functionality
  const handleSignup = () => {
    if (!email || !password) {
      setMessage('Please fill in both email and password.');
      return;
    }
    if (localStorage.getItem(email)) {
      setMessage('User already exists. Please log in.');
    } else {
      localStorage.setItem(email, JSON.stringify({ email, password }));
      setMessage('Signup successful! Please log in.');
      setFormType('login');
    }
  };

  // Login functionality
  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem(email));
    if (!email || !password) {
      setMessage('Please fill in both email and password.');
    } else if (!user) {
      setMessage('User not found. Please sign up first.');
    } else if (user.password !== password) {
      setMessage('Incorrect password.');
    } else {
      setMessage('Login successful!');
    }
  };

  const toggleFormType = () => {
    setFormType(formType === 'login' ? 'signup' : 'login');
    setMessage('');
    setEmail('');
    setPassword('');
  };

  return (
    <div style={styles.background}>
      <div style={styles.card}>
        <h1 style={styles.heading}>{formType === 'login' ? 'Login' : 'Sign Up'}</h1>
        {message && <p style={styles.message}>{message}</p>}
        <div style={styles.inputContainer}>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <button
          onClick={formType === 'login' ? handleLogin : handleSignup}
          style={styles.button}
        >
          {formType === 'login' ? 'Login' : 'Sign Up'}
        </button>
        <p style={styles.switchForm}>
          {formType === 'login'
            ? "Don't have an account? "
            : 'Already have an account? '}
          <span onClick={toggleFormType} style={styles.toggleLink}>
            {formType === 'login' ? 'Sign up here' : 'Login here'}
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  background: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #d4edda, #c3e6cb)', // Pista green gradient
    fontFamily: 'Poppins, sans-serif',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '20px',
    color: '#155724',
    fontSize: '1.8rem',
    fontWeight: '600',
  },
  message: {
    color: 'red',
    marginBottom: '15px',
    fontSize: '0.9rem',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    maxWidth: '300px',
    padding: '10px 15px',
    marginBottom: '15px',
    border: '1px solid #ced4da',
    borderRadius: '8px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease-in-out',
  },
  button: {
    width: '100%',
    maxWidth: '300px',
    padding: '10px',
    backgroundColor: '#28a745', // Green button
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#218838',
  },
  switchForm: {
    marginTop: '15px',
    fontSize: '0.9rem',
  },
  toggleLink: {
    color: '#28a745',
    cursor: 'pointer',
    fontWeight: '600',
    textDecoration: 'underline',
  },
};

export default App;