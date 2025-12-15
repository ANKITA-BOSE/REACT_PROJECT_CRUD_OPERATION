import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [login, setLogin] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
    };
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!login.email.trim() || !login.password.trim()) {
                toast.error("Email and password are required");
                return;
            }
            const {data} = await axios.post("https://api.escuelajs.co/api/v1/auth/login",login);
            window.localStorage.setItem("token",data.access_token);
            toast.success("Login Successful");
            navigate("/home");
        } catch (error) {
           toast.error("Invalid email or password"); 
        }
    }

  return (
    <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
            <h2 style={styles.title}>Login</h2>
            
            <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.label}>Email Address</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={login.email}
                    onChange={handleChange}
                    required
                    style={styles.input}
                    placeholder="Enter your email"
                />
            </div>

            <div style={styles.formGroup}>
                <label htmlFor="password" style={styles.label}>Password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    value={login.password}
                    onChange={handleChange}
                    required
                    style={styles.input}
                    placeholder="Enter your password"
                />
            </div>

            <button type="submit" style={styles.button}>Login</button>
            
            <p style={styles.link}>
                Don't have an account? <a href="/" style={styles.anchor}>Register here</a>
            </p>
        </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px',
    fontSize: '28px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#555',
    fontWeight: '500',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '10px',
  },
  link: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '14px',
    color: '#666',
  },
  anchor: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: '600',
  },
};

export default Login;
